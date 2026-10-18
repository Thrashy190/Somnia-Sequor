"""Recibe el formulario de sueños, lo guarda en DynamoDB y lo envía por correo con SES.

Entrada (JSON): alias?, sex, country, age, dream, lang, website (trampa para bots).
Seguridad: solo se aceptan peticiones cuyo Origin esté en ALLOWED_ORIGINS.
Privacidad: el contenido del sueño nunca se escribe en los logs.
Durabilidad: el stream de DynamoDB lo archiva en S3 (archive/handler.py); primero se guarda y luego se envía el correo; solo falla (502) si ambos fallan.
"""

import base64
import json
import os
import uuid
from datetime import datetime, timedelta, timezone

import boto3
from botocore.exceptions import BotoCoreError, ClientError

from email_template import render_html, render_text, subject_for

TABLE_NAME = os.environ["TABLE_NAME"]
DREAM_TTL_DAYS = int(os.environ["DREAM_TTL_DAYS"])
SENDER_EMAIL = os.environ["SENDER_EMAIL"]
RECIPIENT_EMAIL = os.environ["RECIPIENT_EMAIL"]
ALLOWED_ORIGINS = {o.strip() for o in os.environ["ALLOWED_ORIGINS"].split(",") if o.strip()}

LANGS = {"es", "en", "pt", "fr", "de", "ja", "ko"}
MAX_BODY_BYTES = 64 * 1024
LIMITS = {"alias": 80, "sex": 60, "country": 80, "dream": 10_000}

ses = boto3.client("sesv2")
dynamodb = boto3.client("dynamodb")


class BadRequest(Exception):
    pass


def respond(status: int, payload: dict) -> dict:
    # Las cabeceras CORS las añade API Gateway según su configuración.
    return {
        "statusCode": status,
        "headers": {"content-type": "application/json"},
        "body": json.dumps(payload),
    }


def parse_body(event: dict) -> dict:
    raw = event.get("body") or ""
    if event.get("isBase64Encoded"):
        raw = base64.b64decode(raw).decode("utf-8", errors="replace")
    if len(raw.encode("utf-8")) > MAX_BODY_BYTES:
        raise BadRequest("payload_too_large")
    try:
        data = json.loads(raw)
    except json.JSONDecodeError:
        raise BadRequest("invalid_json")
    if not isinstance(data, dict):
        raise BadRequest("invalid_json")
    return data


def validate(data: dict) -> dict:
    def text(name: str, required: bool = True) -> str:
        value = data.get(name, "")
        if not isinstance(value, str):
            raise BadRequest(f"invalid_{name}")
        value = value.strip()
        if required and not value:
            raise BadRequest(f"missing_{name}")
        if len(value) > LIMITS[name]:
            raise BadRequest(f"too_long_{name}")
        return value

    age = data.get("age")
    # bool es subclase de int: se descarta explícitamente
    if isinstance(age, bool) or not isinstance(age, (int, float)) or int(age) != age or not 0 <= age <= 150:
        raise BadRequest("invalid_age")

    lang = data.get("lang", "es")
    if lang not in LANGS:
        raise BadRequest("invalid_lang")

    return {
        "alias": text("alias", required=False),
        "sex": text("sex"),
        "country": text("country"),
        "age": int(age),
        "dream": text("dream"),
        "lang": lang,
    }


def store_dream(dream: dict, received_at: datetime) -> None:
    stamp = received_at.strftime("%Y-%m-%dT%H:%M:%SZ")
    item = {
        "pk": {"S": f"DREAM#{received_at:%Y-%m}"},
        "sk": {"S": f"{stamp}#{uuid.uuid4().hex}"},
        "created_at": {"S": stamp},
        # Epoch en segundos: DynamoDB borra el ítem solo (TTL). Ya está archivado en S3.
        "expires_at": {"N": str(int((received_at + timedelta(days=DREAM_TTL_DAYS)).timestamp()))},
        "sex": {"S": dream["sex"]},
        "country": {"S": dream["country"]},
        "age": {"N": str(dream["age"])},
        "dream": {"S": dream["dream"]},
        "lang": {"S": dream["lang"]},
    }
    if dream["alias"]:
        item["alias"] = {"S": dream["alias"]}
    dynamodb.put_item(TableName=TABLE_NAME, Item=item, ConditionExpression="attribute_not_exists(sk)")


def send_email(dream: dict, received_at: datetime) -> None:
    ses.send_email(
        FromEmailAddress=SENDER_EMAIL,
        Destination={"ToAddresses": [RECIPIENT_EMAIL]},
        Content={
            "Simple": {
                "Subject": {"Data": subject_for(dream), "Charset": "UTF-8"},
                "Body": {
                    "Text": {"Data": render_text(dream, received_at), "Charset": "UTF-8"},
                    "Html": {"Data": render_html(dream, received_at), "Charset": "UTF-8"},
                },
            }
        },
    )


def handler(event, _context):
    headers = {k.lower(): v for k, v in (event.get("headers") or {}).items()}

    if headers.get("origin") not in ALLOWED_ORIGINS:
        return respond(403, {"error": "forbidden_origin"})

    try:
        data = parse_body(event)

        # Trampa para bots: si el campo oculto trae algo, se finge éxito sin enviar.
        if str(data.get("website", "")).strip():
            return respond(200, {"ok": True})

        dream = validate(data)
    except BadRequest as error:
        return respond(400, {"error": str(error)})

    received_at = datetime.now(timezone.utc)
    saved = emailed = True

    # Cada paso es independiente: si uno falla, el otro conserva el sueño.
    # Solo se registra el tipo de error, nunca el contenido del sueño.
    try:
        store_dream(dream, received_at)
    except (ClientError, BotoCoreError) as error:
        saved = False
        print(f"dynamodb_put_failed: {type(error).__name__}: {error}")

    try:
        send_email(dream, received_at)
    except (ClientError, BotoCoreError) as error:
        emailed = False
        print(f"ses_send_failed: {type(error).__name__}: {error}")

    if not (saved or emailed):
        return respond(502, {"error": "send_failed"})

    return respond(200, {"ok": True})
