// @ts-check
import { defineConfig, fontProviders } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import sitemap from '@astrojs/sitemap';

const locales = ['es', 'en', 'pt', 'fr', 'de'];

// https://astro.build/config
export default defineConfig({
  site: 'https://www.somniasequor.com',
  trailingSlash: 'always',

  i18n: {
    defaultLocale: 'es',
    locales,
    routing: {
      prefixDefaultLocale: false,
    },
  },

  fonts: [
    {
      provider: fontProviders.google(),
      name: 'Cinzel',
      cssVariable: '--font-cinzel',
      weights: ['400 900'],
      styles: ['normal'],
      subsets: ['latin', 'latin-ext'],
      fallbacks: ['Georgia', 'serif'],
    },
  ],

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    sitemap({
      i18n: {
        defaultLocale: 'es',
        locales: Object.fromEntries(locales.map((l) => [l, l])),
      },
    }),
  ],
});
