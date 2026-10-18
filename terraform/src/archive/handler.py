"""Archiva en S3 cada sueño nuevo que llega por el stream de DynamoDB, en JSON Lines.

Un archivo por lote y por día: dreams/year=2026/month=10/day=18/<secuencia>.jsonl
Cada línea es un documento plano listo para cargar en Elasticsearch/OpenSearch (`id` = _id).
La clave del archivo sale del número de secuencia del primer registro, así que un reintento
del mismo lote sobrescribe el mismo archivo en vez de duplicarlo.
Privacidad: el contenido de los sueños nunca se escribe en los logs.
"""

import json
import os
from collections import defaultdict
from decimal import Decimal

import boto3
from boto3.dynamodb.types import TypeDeserializer

BUCKET_NAME = os.environ["BUCKET_NAME"]

s3 = boto3.client("s3")
deserialize = TypeDeserializer().deserialize

# Atributos internos de DynamoDB que no aportan al archivo
INTERNAL = {"pk", "sk", "expires_at"}


def plain(value):
    if isinstance(value, Decimal):
        return int(value) if value == value.to_integral_value() else float(value)
    return value


def to_document(image: dict) -> dict:
    item = {key: plain(deserialize(value)) for key, value in image.items()}
    document = {"id": item["sk"]}
    document.update({key: value for key, value in item.items() if key not in INTERNAL})
    return document


def handler(event, _context):
    by_day: dict[str, list[dict]] = defaultdict(list)
    first_sequence: dict[str, str] = {}

    for record in event["Records"]:
        # El filtro del event source mapping ya deja pasar solo INSERT; esto es un seguro.
        if record.get("eventName") != "INSERT":
            continue
        document = to_document(record["dynamodb"]["NewImage"])
        day = document["created_at"][:10]
        by_day[day].append(document)
        first_sequence.setdefault(day, record["dynamodb"]["SequenceNumber"])

    for day, documents in by_day.items():
        year, month, date = day.split("-")
        key = f"dreams/year={year}/month={month}/day={date}/{first_sequence[day]}.jsonl"
        body = "".join(json.dumps(document, ensure_ascii=False) + "\n" for document in documents)
        s3.put_object(Bucket=BUCKET_NAME, Key=key, Body=body.encode("utf-8"), ContentType="application/x-ndjson")

    archived = sum(len(documents) for documents in by_day.values())
    print(f"archived={archived} files={len(by_day)}")
    return {"archived": archived}
