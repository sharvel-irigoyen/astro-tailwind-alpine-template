// @ts-check
import { defineConfig, envField } from 'astro/config';

import tailwindcss from '@tailwindcss/vite';
import alpinejs from '@astrojs/alpinejs';

// https://astro.build/config
export default defineConfig({
  vite: {
    plugins: [tailwindcss()],
  },

  integrations: [
    alpinejs({
      entrypoint: '/src/scripts/alpine-entrypoint.ts',
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
    },
  },
});
