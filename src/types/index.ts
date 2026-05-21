export interface ServiceItem {
  title: string;
  description: string;
  longDescription: string;
  icon: string;
  slug: string;
}

export interface FeatureItem {
  title: string;
  description: string;
  icon: string;
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface TestimonialItem {
  name: string;
  role: string;
  company: string;
  text: string;
  stars: number;
  avatar: string;
}

export interface SiteConfig {
  name: string;
  tagline: string;
  description: string;
  url: string;
  theme: {
    allowToggle: boolean;
    defaultMode: 'light' | 'dark' | 'system';
  };
  contact: {
    email: string;
    phone: string;
    phoneLink: string;
    address: string;
    addressLink: string;
    whatsapp: string;
    whatsappMessage: string;
    hours: string[];
    latitude: number;
    longitude: number;
  };
  socials: {
    facebook?: string;
    instagram?: string;
    linkedin?: string;
    twitter?: string;
  };
  turnstile?: {
    enabled: boolean;
    siteKey: string;
  };
  analytics?: {
    umami?: {
      enabled: boolean;
      websiteId: string;
      src: string;
    };
    clarity?: {
      enabled: boolean;
      projectId: string;
    };
  };
  navigation: {
    header: { name: string; href: string }[];
    footer: {
      quickLinks: { name: string; href: string }[];
      services: { name: string; href: string }[];
      legal: { name: string; href: string }[];
    };
  };
}
