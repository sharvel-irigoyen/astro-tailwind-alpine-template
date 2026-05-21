import type { ServiceItem } from '../types';

export const services: ServiceItem[] = [
  {
    slug: 'paginas-web',
    title: 'Páginas Web y Landing Pages',
    description:
      'Diseños a medida optimizados para convertir visitantes en clientes potenciales y leads calificados.',
    longDescription:
      'Nuestras páginas web y landing pages se construyen con tecnología estática de última generación. Esto garantiza tiempos de carga inferiores a 1 segundo, lo que incrementa tus conversiones y la retención de usuarios. Adaptamos la estética completa a la identidad de tu marca con efectos interactivos modernos y fluidos.',
    icon: 'web',
  },
  {
    slug: 'ecommerce',
    title: 'Comercio Electrónico (E-commerce)',
    description:
      'Tiendas online veloces e integradas con pasarelas de pago locales para maximizar tus ventas.',
    longDescription:
      'Desarrollamos tiendas virtuales optimizadas para dispositivos móviles. Conectamos pasarelas de pago seguras (MercadoPago, Niubiz, Culqi, Stripe) y estructuramos catálogos dinámicos auto-administrables. La velocidad y la seguridad son prioridad para evitar carritos abandonados.',
    icon: 'cart',
  },
  {
    slug: 'sistemas',
    title: 'Sistemas y Apps a Medida',
    description:
      'Digitalizamos tus procesos internos de negocio mediante software a medida rápido y escalable.',
    longDescription:
      'Si tu PYME necesita gestionar inventarios, automatizar flujos de trabajo o administrar clientes (CRM personalizado), creamos portales web eficientes con tecnología moderna de desarrollo y almacenamiento seguro de datos.',
    icon: 'code',
  },
  {
    slug: 'seo',
    title: 'Optimización SEO Local',
    description:
      'Posicionamiento estratégico en motores de búsqueda para captar clientes en tu zona geográfica.',
    longDescription:
      'Implementamos datos estructurados Schema.org avanzados (LocalBusiness), sitemaps XML automáticos, optimización minuciosa de imágenes y jerarquía semántica HTML5. Esto le dice exactamente a Google qué hace tu negocio y dónde está ubicado.',
    icon: 'search',
  },
];
