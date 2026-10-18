# Somnia Sequor

**¿Has tenido sueños extraños?**

Somnia Sequor es un proyecto que investiga un reciente aumento de sueños extraños e inexplicables. Esta web es una sola página, minimalista y de aire esotérico, donde cualquiera puede compartir de forma anónima un sueño peculiar, angustiante o inusual.

> Creemos en lo invaluable que es la experiencia humana, por lo que ningún tipo de inteligencia artificial será alimentada con los sueños ni con ninguna información que nos sea proporcionada.

- Sitio: https://www.somniasequor.com
- Pruebas: https://somnia-sequor.pages.dev
- Contacto: somniasequor@gmail.com

## Cómo funciona

```
Navegador ──▶ Sitio estático (Astro, Cloudflare Pages)
    │
    └─ envía el formulario ──▶ API Gateway ──▶ Lambda ──┬─▶ DynamoDB ─(stream)─▶ S3 (archivo JSON)
                                                        └─▶ SES ──▶ somniasequor@gmail.com
```

| Parte | Dónde | Qué hace |
|---|---|---|
| Sitio | `src/` | Landing en 7 idiomas con formulario, modo claro/oscuro y SEO completo |
| API | `terraform/` | Recibe el formulario, lo guarda, lo archiva y lo envía por correo (AWS) |

El detalle de la infraestructura, la protección de la API y cómo leer los sueños guardados está en [`terraform/README.md`](terraform/README.md).

## Stack

- [Astro](https://astro.build) 7 (sitio estático) y TypeScript
- [Tailwind CSS](https://tailwindcss.com) 4
- Cinzel (Google Fonts a través de la API de fuentes de Astro) como única tipografía
- Terraform y AWS: API Gateway HTTP, Lambda (Python 3.13), SES, DynamoDB y S3
- Cloudflare Pages para el hosting

## Estructura

```text
/
├── public/                  robots.txt, favicons e imagen Open Graph
├── src/
│   ├── assets/illustrations/  grabados del hero, formulario y pie
│   ├── components/          Header, Hero, DreamForm, Footer, selectores de idioma y tema…
│   ├── i18n/
│   │   ├── ui.ts            idiomas y todos los textos
│   │   └── utils.ts         traducciones y URLs por idioma
│   ├── layouts/Layout.astro <head> con SEO, hreflang, Open Graph y JSON-LD
│   ├── pages/               index.astro (español) y [lang]/index.astro (resto)
│   └── styles/global.css    tema (tinta y papel) y utilidades
├── terraform/               infraestructura y código de las Lambdas
├── .env.production          URL pública de la API (se usa al compilar)
└── .node-version            versión de Node para Cloudflare Pages
```

## Desarrollo

Requiere Node `>=22.22.0`.

| Comando | Acción |
| :-- | :-- |
| `npm install` | Instala dependencias |
| `npm run dev` | Servidor local en `localhost:4321` |
| `npm run check` | Revisa tipos y plantillas (`astro check`) |
| `npm run build` | Revisa y compila a `./dist/` |
| `npm run preview` | Sirve el build local |

En desarrollo, si `PUBLIC_API_URL` no está definida, el formulario **simula** el envío (no manda nada). Para probar contra la API real desde local, crea un `.env` con la URL y añade `http://localhost:4321` a `extra_allowed_origins` en Terraform (ver su README); la API rechaza cualquier otro origen.

## Idiomas

Español en `/` y una URL por idioma: `/en/`, `/pt/`, `/fr/`, `/de/`, `/ja/`, `/ko/`. Cada una tiene su `title`, descripción, `hreflang` y entrada en el sitemap.

Para añadir un idioma:

1. `src/i18n/ui.ts`: agrégalo a `languages` y escribe su diccionario (TypeScript avisa si falta alguna clave).
2. `astro.config.mjs`: añádelo a `locales`.
3. `terraform/src/submit/handler.py` (`LANGS`) y `email_template.py` (`LANG_NAMES`): para que la API acepte el idioma y el correo lo nombre.

## Formulario y API

El formulario pide alias (opcional), sexo, país, edad (0–150) y el sueño. Valida en el cliente y vuelve a validar en la Lambda. Envía un `POST` a la URL de `PUBLIC_API_URL`, que se fija al compilar:

- Producción: `.env.production` (la URL es pública, no es un secreto). Sale de `terraform output -raw api_url`.
- Cloudflare Pages: si defines `PUBLIC_API_URL` en el panel, tiene prioridad.

## Despliegue

**Sitio (Cloudflare Pages):** conectado al repo de GitHub.

| Ajuste | Valor |
| :-- | :-- |
| Build command | `npm run build` |
| Output directory | `dist` |
| Node | `22.22.0` (fijado en `.node-version`) |

Las ramas de preview de Pages usan URLs `https://<hash>.somnia-sequor.pages.dev`, que la API no acepta: prueba siempre desde el dominio de producción de Pages.

**API:**

```bash
cd terraform
terraform init
terraform apply
```

La primera vez, abre el enlace de verificación que AWS envía a somniasequor@gmail.com, o SES no podrá enviar correos.

## Privacidad

- Los sueños se envían de forma anónima: no se guarda IP ni se registra el contenido en logs.
- Los logs se conservan 7 días.
- Cada sueño queda 15 días en DynamoDB y de forma permanente en un bucket S3 privado y cifrado, en JSON Lines, listo para analizarlo después (por ejemplo en OpenSearch).
- Ningún sueño se comparte con sistemas de inteligencia artificial.
