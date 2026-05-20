// @ts-check
import { defineConfig, envField } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import alpinejs from '@astrojs/alpinejs';
import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  // IMPORTANT: Change this to your production URL before deploying
  site: 'https://example.com',

  compressHTML: true,

  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    alpinejs({
      entrypoint: '/src/scripts/alpine-entrypoint.ts',
    }),
    sitemap(),
  ],

  env: {
    schema: {
      // Example of required environment variable (fail-fast validation)
      API_URL: envField.string({
        context: 'server',
        access: 'public',
        optional: true,
        default: 'https://api.example.com',
      }),
    },
  },
});
