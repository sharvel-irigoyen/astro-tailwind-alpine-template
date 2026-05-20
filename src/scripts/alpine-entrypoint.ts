import type { Alpine } from 'alpinejs';
import * as Sentry from '@sentry/browser';
import counter from './counter';

// Capturar errores internos de evaluación de Alpine.js
document.addEventListener('alpine:init', () => {
  window.addEventListener('error', (event) => {
    if (event.filename && event.filename.includes('alpine')) {
      Sentry.captureException(event.error);
    }
  });
});

export default function (Alpine: Alpine) {
  // Registrar todos los componentes y stores extraídos aquí
  counter(Alpine);
}
