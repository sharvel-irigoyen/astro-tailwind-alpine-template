import type { FaqItem } from '../types';

export const faq: FaqItem[] = [
  {
    question: '¿Qué tecnología se utiliza para construir los sitios?',
    answer:
      'Utilizamos Astro 6, que genera HTML estático puro eliminando JavaScript innecesario para lograr la máxima velocidad, Tailwind CSS 4 para el diseño de interfaces modernas y Alpine.js para interactividad fluida de bajo peso.',
  },
  {
    question: '¿Cómo funciona el envío del formulario de contacto?',
    answer:
      'El formulario de contacto realiza una petición directa y segura a un webhook automatizado en n8n. Esto significa que no hay bases de datos expuestas en el frontend y tus datos comerciales viajan seguros.',
  },
  {
    question: '¿Qué incluye la optimización SEO Local?',
    answer:
      'Incluye la generación automática del mapa del sitio (sitemap), metadatos de redes sociales OpenGraph y Twitter Cards, y datos estructurados Schema LocalBusiness JSON-LD que indican a Google tu ubicación exacta, horario y formas de contacto.',
  },
  {
    question: '¿Es fácil cambiar el estilo cromático de la empresa?',
    answer:
      'Sí. A través de variables de color CSS configuradas en el archivo global de estilos, se puede cambiar toda la paleta de colores del sitio para adaptarla a la línea gráfica de tu empresa en segundos.',
  },
];
