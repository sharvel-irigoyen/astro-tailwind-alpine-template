import type { SiteConfig } from '../types';
import {
  PUBLIC_TURNSTILE_SITE_KEY,
  PUBLIC_UMAMI_WEBSITE_ID,
  PUBLIC_UMAMI_SCRIPT_URL,
  PUBLIC_CLARITY_PROJECT_ID,
} from 'astro:env/client';

export const siteConfig: SiteConfig = {
  name: 'Qonpania Solutions',
  tagline: 'Transformación Digital y Software a Medida para PYMEs',
  description:
    'Desarrollamos soluciones web modernas, rápidas y optimizadas para buscadores. Creamos landing pages, e-commerce y sistemas internos a medida para hacer crecer tu negocio.',
  url: 'https://qonpania.com',
  theme: {
    allowToggle: true,
    defaultMode: 'system', // 'light' | 'dark' | 'system'
  },
  contact: {
    email: 'contacto@qonpania.com',
    phone: '+51 987 654 321',
    phoneLink: 'tel:+51987654321',
    address: 'Av. Alfredo Benavides 1234, Miraflores, Lima, Perú',
    addressLink:
      'https://maps.google.com/?q=Av.+Alfredo+Benavides+1234,+Miraflores,+Lima,+Peru',
    whatsapp: '51987654321',
    whatsappMessage:
      'Hola Qonpania, me gustaría recibir una asesoría gratuita sobre soluciones web para mi empresa.',
    hours: ['Lunes a Viernes: 9:00 AM - 6:00 PM', 'Sábados: 9:00 AM - 1:00 PM'],
    latitude: -12.1245,
    longitude: -77.0278,
  },
  socials: {
    facebook: 'https://facebook.com/qonpania',
    instagram: 'https://instagram.com/qonpania',
    linkedin: 'https://linkedin.com/company/qonpania',
    twitter: 'https://twitter.com/qonpania',
  },
  turnstile: {
    enabled: true,
    siteKey: PUBLIC_TURNSTILE_SITE_KEY || '1x00000000000000000000AA', // Siempre pasa (Cloudflare Test Key)
  },
  analytics: {
    umami: {
      enabled: !!PUBLIC_UMAMI_WEBSITE_ID,
      websiteId: PUBLIC_UMAMI_WEBSITE_ID || '',
      src:
        PUBLIC_UMAMI_SCRIPT_URL || 'https://analiticas.midominio.com/script.js',
    },
    clarity: {
      enabled: !!PUBLIC_CLARITY_PROJECT_ID,
      projectId: PUBLIC_CLARITY_PROJECT_ID || '',
    },
  },
  navigation: {
    header: [
      { name: 'Inicio', href: '/' },
      { name: 'Nosotros', href: '/nosotros/' },
      { name: 'Servicios', href: '/servicios/' },
      { name: 'Blog', href: '/blog/' },
      { name: 'Contacto', href: '/contacto/' },
    ],
    footer: {
      quickLinks: [
        { name: 'Inicio', href: '/' },
        { name: 'Nosotros', href: '/nosotros/' },
        { name: 'Servicios', href: '/servicios/' },
        { name: 'Blog', href: '/blog/' },
        { name: 'Contacto', href: '/contacto/' },
      ],
      services: [
        { name: 'Páginas Web y Landings', href: '/servicios/#paginas-web' },
        { name: 'Comercio Electrónico', href: '/servicios/#ecommerce' },
        { name: 'Sistemas a Medida', href: '/servicios/#sistemas' },
        { name: 'Optimización SEO', href: '/servicios/#seo' },
      ],
      legal: [
        { name: 'Aviso Legal', href: '/terminos/' },
        { name: 'Política de Privacidad', href: '/privacidad/' },
        { name: 'Política de Cookies', href: '/privacidad/#cookies' },
      ],
    },
  },
};
