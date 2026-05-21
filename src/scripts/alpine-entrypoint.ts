import type { Alpine } from 'alpinejs';
import * as Sentry from '@sentry/browser';
import counter from './components/counter';
import theme from './components/theme';
import faqAccordion from './components/faqAccordion';
import cookieBanner from './components/cookieBanner';
import navigationHeader from './components/navigationHeader';
import contactForm from './components/contactForm';

// Captura global de errores no controlados y envío a Sentry.
// @sentry/astro ya captura excepciones automáticamente, pero este handler
// garantiza cobertura explícita para errores que puedan originarse en Alpine.js,
// ya que los archivos compilados de producción tienen nombres con hash
// y no pueden filtrarse por nombre de archivo.
window.addEventListener('error', (event) => {
  if (event.error) {
    Sentry.captureException(event.error);
  }
});

window.addEventListener('unhandledrejection', (event) => {
  Sentry.captureException(event.reason);
});

export default function (Alpine: Alpine) {
  // Registrar todos los componentes y stores extraídos aquí
  counter(Alpine);
  theme(Alpine);
  faqAccordion(Alpine);
  cookieBanner(Alpine);
  navigationHeader(Alpine);
  contactForm(Alpine);
}
