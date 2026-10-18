# Infraestructura — Somnia Sequor

API para recibir los sueños del formulario, guardarlos en DynamoDB y enviarlos por correo.

```
                                                        ┌──▶ DynamoDB (15 días) ──stream──▶ Lambda ──▶ S3 (JSON Lines, permanente)
Formulario ──POST──▶ API Gateway (HTTP API) ──▶ Lambda ─┤
                                                        └──▶ SES ──▶ somniasequor@gmail.com
```

| Archivo | Qué define |
|---|---|
| `api_gateway.tf` | HTTP API, ruta `POST /dreams`, CORS, throttling y logs |
| `lambda.tf` | Función Python, rol IAM de mínimo privilegio, logs |
| `ses.tf` | Identidad de correo verificada |
| `dynamodb.tf` | Tabla donde se guarda cada sueño (con stream y TTL) |
| `archive.tf` | Lambda que copia cada sueño nuevo del stream a S3 |
| `s3.tf` | Bucket privado y cifrado con el archivo permanente |
| `src/submit/` | Lambda del formulario: validación, guardado y envío (`handler.py`, `email_template.py`) |
| `src/archive/handler.py` | Lambda que pasa los sueños del stream a S3 |

## Protección de la API

- **CORS:** solo `https://www.somniasequor.com`, `https://somniasequor.com` y `https://somnia-sequor.pages.dev`.
- **Origin en la Lambda:** cualquier petición sin `Origin` permitido recibe `403`, incluso si no viene de un navegador sin CORS (curl, scripts…).
- **Throttling:** 5 req/s (ráfaga 10) en toda la API.
- **Validación** idéntica a la del formulario, límite de 64 KB y trampa para bots (`website`).
- **IAM:** la Lambda solo puede escribir en su log group y enviar correo desde el remitente verificado.
- **Privacidad:** el contenido del sueño no se escribe en ningún log; el log de acceso no guarda IP.
- **Logs:** se conservan 7 días (`log_retention_days`) y CloudWatch los elimina solos.

> El `Origin` puede falsificarse desde un script, así que esto frena el uso desde otros sitios web y el abuso casual, no a un atacante decidido. El throttling limita el daño; si hiciera falta más, el siguiente paso es Turnstile (Cloudflare) validado en la Lambda.

## Despliegue

```bash
cd terraform
terraform init
terraform apply
```

Después del `apply`:

1. **Verifica el correo.** AWS envía un mensaje a somniasequor@gmail.com ("Amazon Web Services – Email Address Verification Request"). Abre el enlace; hasta entonces la identidad está en *pending* y el envío falla.
2. Copia el output `api_url`: es la URL a la que debe hacer `POST` el formulario.

### SES en modo sandbox

Una cuenta nueva de SES está en *sandbox*: solo envía a direcciones verificadas. Como remitente y destinatario son el mismo correo verificado, funciona sin pedir acceso a producción. Si cambias `recipient_email` a otra dirección, Terraform la verifica también, pero deberá confirmarla.

## Probar

```bash
URL=$(terraform output -raw api_url)

# Origen permitido → 200 y llega un correo
curl -i -X POST "$URL" \
  -H 'content-type: application/json' \
  -H 'origin: https://somnia-sequor.pages.dev' \
  -d '{"alias":"","sex":"F","country":"México","age":30,"dream":"Prueba","lang":"es"}'

# Otro origen → 403
curl -i -X POST "$URL" -H 'content-type: application/json' -H 'origin: https://example.com' -d '{}'
```

## Dónde se guardan los sueños

Tabla `somnia-sequor-dreams` (DynamoDB, pago por uso, cifrada y con recuperación a un punto en el tiempo). Un ítem por sueño:

| Atributo | Contenido |
|---|---|
| `pk` | `DREAM#2026-10` (el mes, para listar por mes) |
| `sk` | `2026-10-18T18:03:11Z#<uuid>` (fecha UTC; ordena cronológicamente) |
| `created_at`, `alias`?, `sex`, `country`, `age`, `dream`, `lang` | los datos del formulario |

La Lambda guarda primero y envía el correo después, de forma independiente: si falla uno, el otro conserva el sueño, y solo responde `502` si fallan los dos.

### Archivo en S3 y vaciado cada 15 días

DynamoDB Streams no funciona por calendario: emite un evento cada vez que se escribe un ítem. Por eso el vaciado se hace al revés, para que nunca se borre algo que no esté ya a salvo:

1. **Al guardarse**, cada sueño pasa por el stream a la Lambda `archive-dreams`, que lo escribe en S3.
2. **A los 15 días** (`dreams_ttl_days`) el TTL de DynamoDB borra el ítem solo. Es gratis y suele tardar horas, como mucho ~48 h de retraso. Esos borrados no vuelven a archivarse.

Archivos en `s3://<bucket>/dreams/year=2026/month=10/day=18/<secuencia>.jsonl`, un sueño por línea (JSON Lines), con el bucket privado, cifrado y con versionado:

```json
{"id":"2026-10-18T10:00:00Z#8c2f…","created_at":"2026-10-18T10:00:00Z","alias":"Ana","sex":"F","country":"México","age":42,"dream":"…","lang":"es"}
```

Cada línea es un documento plano, así que sirve tal cual para cargarla en Elasticsearch/OpenSearch (`id` como `_id`), por ejemplo con OpenSearch Ingestion, Logstash (`s3` input) o un `_bulk`. También se puede consultar con Athena.

```bash
aws s3 ls "s3://$(terraform output -raw archive_bucket_name)/dreams/" --recursive
```

Notas: los sueños anteriores al despliegue del stream no se archivan solos, y los que ya estaban en la tabla sin `expires_at` no caducan. Si el archivador fallara más de 24 h, el sueño sigue 15 días en la tabla y puede recuperarse de ahí.

La tabla tiene protección contra borrado: `terraform destroy` falla a propósito. Para desmontarla, aplica antes con `dreams_table_deletion_protection = false`.

## Formato de la petición

`POST /dreams` con JSON:

| Campo | Regla |
|---|---|
| `alias` | opcional, ≤ 80 |
| `sex` | requerido, ≤ 60 |
| `country` | requerido, ≤ 80 |
| `age` | entero 0–150 |
| `dream` | requerido, ≤ 10 000 |
| `lang` | `es` `en` `pt` `fr` `de` |
| `website` | trampa para bots: debe ir vacío |

Respuestas: `200 {"ok":true}`, `400 {"error":"…"}`, `403 forbidden_origin`, `502 send_failed`.

## Desarrollo local

Para llamar a la API desde `astro dev`, crea `terraform.tfvars` con
`extra_allowed_origins = ["http://localhost:4321"]` y vuelve a aplicar. Quítalo en producción.

## Estado de Terraform

El estado es local (`terraform.tfstate`, ignorado por git). Si más gente va a desplegar, muévelo a un backend remoto (S3 + bloqueo).
