// @ts-check
import { defineConfig, envField } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import alpinejs from '@astrojs/alpinejs';
import sitemap from '@astrojs/sitemap';
import sentry from '@sentry/astro';

// https://astro.build/config
export default defineConfig({
  // IMPORTANT: Change this to your production URL before deploying
  site: 'https://example.com',

  compressHTML: true,

  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        alpinejs: '@alpinejs/csp',
      },
    },
  },

  integrations: [
    alpinejs({
      entrypoint: '/src/scripts/alpine-entrypoint.ts',
    }),
    sitemap(),
    sentry({
      dsn:
        process.env.PUBLIC_SENTRY_DSN ||
        'https://examplePublicKey@o0.ingest.sentry.io/0',
      sourceMapsUploadOptions: {
        project: 'my-project',
        authToken: process.env.SENTRY_AUTH_TOKEN,
      },
    }),
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
      PUBLIC_N8N_WEBHOOK_URL: envField.string({
        context: 'client',
        access: 'public',
        optional: true,
        default: 'https://n8n.example.com/webhook/contact',
      }),
      PUBLIC_TURNSTILE_SITE_KEY: envField.string({
        context: 'client',
        access: 'public',
        optional: true,
        default: '1x00000000000000000000AA',
      }),
      PUBLIC_UMAMI_WEBSITE_ID: envField.string({
        context: 'client',
        access: 'public',
        optional: true,
      }),
      PUBLIC_UMAMI_SCRIPT_URL: envField.string({
        context: 'client',
        access: 'public',
        optional: true,
        default: 'https://analiticas.midominio.com/script.js',
      }),
      PUBLIC_CLARITY_PROJECT_ID: envField.string({
        context: 'client',
        access: 'public',
        optional: true,
      }),
    },
  },
});
