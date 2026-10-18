import { getAbsoluteLocaleUrl, getRelativeLocaleUrl } from 'astro:i18n';
import { defaultLang, languages, locales, type Lang, type UiKey, ui } from './ui';

export function isLang(value: unknown): value is Lang {
  return typeof value === 'string' && value in languages;
}

export function getLangFromUrl(url: URL): Lang {
  const [, segment] = url.pathname.split('/');
  return isLang(segment) ? segment : defaultLang;
}

export function useTranslations(lang: Lang) {
  return function t(key: UiKey): string {
    return ui[lang][key];
  };
}

/** Ruta relativa de la home en cada idioma: `/`, `/en/`, `/pt/`… */
export const localePath = (lang: Lang) => getRelativeLocaleUrl(lang);

/** URL absoluta (para canonical, hreflang y Open Graph). */
export const localeUrl = (lang: Lang) => getAbsoluteLocaleUrl(lang);

export const alternates = () => locales.map((lang) => ({ lang, href: localeUrl(lang) }));
