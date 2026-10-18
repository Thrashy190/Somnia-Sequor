"""Correo de "nuevo sueño" con la estética del sitio: tinta sobre papel, Cinzel, ornamento ✦.

Los clientes de correo no son navegadores: todo el diseño va en tablas con estilos en línea.
Cinzel solo se carga donde hay soporte de fuentes web (Apple Mail, iOS…); en el resto
(Gmail, Outlook) cae a Georgia/Times, que con las mayúsculas y el espaciado mantiene el tono.
Modo oscuro con `prefers-color-scheme` (mismos colores que el sitio) donde el cliente lo respeta.
"""

import re
from html import escape

FONT_URL = "https://fonts.googleapis.com/css2?family=Cinzel:wght@400;500&display=swap"
FONT = "'Cinzel','Trajan Pro 3','Trajan Pro',Georgia,'Times New Roman',serif"

INK = "#000000"
PAPER = "#ffffff"
MUTED = "#6f6f6f"

LANG_NAMES = {"es": "Español", "en": "English", "pt": "Português", "fr": "Français", "de": "Deutsch", "ja": "日本語", "ko": "한국어"}
MONTHS = [
    "enero", "febrero", "marzo", "abril", "mayo", "junio",
    "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre",
]  # fmt: skip

STYLE = """
  body { margin: 0; padding: 0; }
  a { color: inherit; }
  @media (max-width: 620px) {
    .gutter { padding-left: 24px !important; padding-right: 24px !important; }
    .title-sm { font-size: 18px !important; }
    .title-lg { font-size: 46px !important; line-height: 58px !important; padding-left: 14px !important; }
    .col { display: block !important; width: 100% !important; }
    .gap { display: none !important; }
    .dream { font-size: 17px !important; line-height: 30px !important; }
  }
  @media (prefers-color-scheme: dark) {
    .paper { background-color: #0a0a0a !important; }
    .ink { color: #f2efe9 !important; }
    .muted { color: #8f8b84 !important; }
    .rule { border-color: #f2efe9 !important; }
  }
"""


def one_line(value: str) -> str:
    """Quita saltos de línea y caracteres de control (evita inyección en el asunto)."""
    return re.sub(r"[\x00-\x1f\x7f]+", " ", value).strip()


def format_date(received_at) -> str:
    return f"{received_at.day} de {MONTHS[received_at.month - 1]} de {received_at.year}, {received_at:%H:%M} UTC"


def subject_for(dream: dict) -> str:
    return one_line(f"Nuevo sueño · {dream['country']} · {dream['age']} años ({dream['lang']})")[:200]


def render_text(dream: dict, received_at) -> str:
    return "\n".join(
        [
            "SOMNIA SEQUOR",
            "✦ Un nuevo sueño ✦",
            "",
            f"Alias:  {one_line(dream['alias']) or '(anónimo)'}",
            f"Sexo:   {one_line(dream['sex'])}",
            f"País:   {one_line(dream['country'])}",
            f"Edad:   {dream['age']}",
            f"Idioma: {LANG_NAMES.get(dream['lang'], dream['lang'])}",
            "",
            "SUEÑO",
            "",
            dream["dream"],
            "",
            "—",
            f"Recibido el {format_date(received_at)}. Enviado de forma anónima desde somniasequor.com",
            "",
        ]
    )


def _label(text: str) -> str:
    return (
        f'<div class="muted" style="font-family:{FONT};font-size:11px;line-height:16px;'
        f'letter-spacing:0.3em;text-transform:uppercase;color:{MUTED};">{escape(text)}</div>'
    )


def _field(label: str, value: str) -> str:
    shown = escape(value) if value else f'<span class="muted" style="color:{MUTED};">—</span>'
    return (
        f"{_label(label)}"
        f'<div class="ink rule" style="font-family:{FONT};font-size:19px;line-height:28px;color:{INK};'
        f'border-bottom:1px solid {INK};padding:6px 0 8px 0;margin-top:6px;">{shown}</div>'
    )


def _row(left: tuple[str, str], right: tuple[str, str]) -> str:
    return (
        '<tr><td class="col" valign="top" width="48%" style="padding-bottom:28px;">'
        f"{_field(*left)}</td>"
        '<td class="gap" width="4%" style="font-size:0;line-height:0;">&nbsp;</td>'
        '<td class="col" valign="top" width="48%" style="padding-bottom:28px;">'
        f"{_field(*right)}</td></tr>"
    )


def _ornament() -> str:
    rule = (
        f'<div class="rule" style="border-top:1px solid {INK};height:0;line-height:0;font-size:0;">&nbsp;</div>'
    )
    return (
        '<table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0"><tr>'
        f'<td width="38%" valign="middle">{rule}</td>'
        f'<td width="24%" align="center" valign="middle" class="ink" style="font-family:{FONT};font-size:14px;'
        f'color:{INK};">&#10022;</td>'
        f'<td width="38%" valign="middle">{rule}</td></tr></table>'
    )


def _dream_html(text: str) -> str:
    paragraphs = [p for p in re.split(r"\n\s*\n", text.strip()) if p.strip()]
    return "".join(
        f'<p class="ink dream" style="margin:0 0 20px 0;font-family:{FONT};font-size:19px;line-height:34px;'
        f'color:{INK};">{escape(p.strip()).replace(chr(10), "<br>")}</p>'
        for p in paragraphs
    )


def render_html(dream: dict, received_at) -> str:
    preheader = escape(one_line(dream["dream"])[:110])
    return f"""<!doctype html>
<html lang="es">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="light dark">
<meta name="supported-color-schemes" content="light dark">
<title>Nuevo sueño · Somnia Sequor</title>
<link rel="stylesheet" href="{FONT_URL}">
<style>{STYLE}</style>
</head>
<body class="paper" style="margin:0;padding:0;background-color:{PAPER};">
<div style="display:none;max-height:0;overflow:hidden;opacity:0;color:transparent;">{preheader}&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;&#847;&zwnj;&nbsp;</div>
<table role="presentation" class="paper" width="100%" cellpadding="0" cellspacing="0" border="0" bgcolor="{PAPER}" style="background-color:{PAPER};">
<tr><td align="center" style="padding:40px 12px 56px 12px;">
  <table role="presentation" width="600" cellpadding="0" cellspacing="0" border="0" style="width:100%;max-width:600px;">

    <tr><td class="gutter" style="padding:0 40px;">
      <div class="ink" style="font-family:{FONT};font-size:12px;line-height:18px;letter-spacing:0.35em;text-transform:uppercase;color:{INK};">Somnia Sequor</div>
    </td></tr>

    <tr><td class="gutter" style="padding:56px 40px 8px 40px;">
      <div class="ink title-sm" style="font-family:{FONT};font-size:22px;line-height:28px;letter-spacing:0.12em;text-transform:uppercase;color:{INK};">Un nuevo</div>
      <div class="ink title-lg" style="font-family:{FONT};font-size:64px;line-height:76px;text-transform:uppercase;color:{INK};padding-left:28px;">Sueño</div>
    </td></tr>

    <tr><td class="gutter" style="padding:40px 40px 48px 40px;">{_ornament()}</td></tr>

    <tr><td class="gutter" style="padding:0 40px;">
      <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0">
        {_row(("Alias", one_line(dream["alias"])), ("Sexo", one_line(dream["sex"])))}
        {_row(("País", one_line(dream["country"])), ("Edad", str(dream["age"])))}
      </table>
    </td></tr>

    <tr><td class="gutter" style="padding:20px 40px 20px 40px;">
      {_label("Sueño")}
      <div style="height:20px;line-height:20px;font-size:0;">&nbsp;</div>
      {_dream_html(dream["dream"])}
    </td></tr>

    <tr><td class="gutter" style="padding:32px 40px 32px 40px;">{_ornament()}</td></tr>

    <tr><td class="gutter" align="center" style="padding:0 40px;">
      <div class="muted" style="font-family:{FONT};font-size:11px;line-height:20px;letter-spacing:0.2em;text-transform:uppercase;color:{MUTED};">
        Recibido el {escape(format_date(received_at))}<br>
        Idioma · {escape(LANG_NAMES.get(dream["lang"], dream["lang"]))}
      </div>
      <div class="muted" style="font-family:{FONT};font-size:12px;line-height:20px;color:{MUTED};padding-top:18px;">
        Enviado de forma anónima desde somniasequor.com.<br>Ninguna inteligencia artificial ha leído este sueño.
      </div>
    </td></tr>

  </table>
</td></tr>
</table>
</body>
</html>
"""
