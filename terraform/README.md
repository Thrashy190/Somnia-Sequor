# Infraestructura — Somnia Sequor

API para recibir los sueños del formulario y enviarlos por correo.

```
Formulario ──POST──▶ API Gateway (HTTP API) ──▶ Lambda (Python 3.13) ──▶ SES ──▶ somniasequor@gmail.com
```

| Archivo | Qué define |
|---|---|
| `api_gateway.tf` | HTTP API, ruta `POST /dreams`, CORS, throttling y logs |
| `lambda.tf` | Función Python, rol IAM de mínimo privilegio, logs |
| `ses.tf` | Identidad de correo verificada |
| `src/handler.py` | Validación del formulario y envío con SES |

## Protección de la API

- **CORS:** solo `https://www.somniasequor.com`, `https://somniasequor.com` y `https://somnia-sequor.pages.dev`.
- **Origin en la Lambda:** cualquier petición sin `Origin` permitido recibe `403`, incluso si no viene de un navegador sin CORS (curl, scripts…).
- **Throttling:** 5 req/s (ráfaga 10) en toda la API.
- **Validación** idéntica a la del formulario, límite de 64 KB y trampa para bots (`website`).
- **IAM:** la Lambda solo puede escribir en su log group y enviar correo desde el remitente verificado.
- **Privacidad:** el contenido del sueño no se escribe en ningún log; el log de acceso no guarda IP.

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
