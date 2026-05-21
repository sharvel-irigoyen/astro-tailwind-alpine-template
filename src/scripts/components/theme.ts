import type { Alpine } from 'alpinejs';

export default function (Alpine: Alpine) {
  // Determinar tema inicial leyendo las configuraciones pasadas en data attributes
  const doc = typeof document !== 'undefined' ? document.documentElement : null;
  const allowToggle = doc
    ? doc.getAttribute('data-allow-toggle') === 'true'
    : true;
  const defaultMode = doc
    ? (doc.getAttribute('data-default-mode') as 'light' | 'dark' | 'system') ||
      'system'
    : 'system';

  const getInitialTheme = (): 'light' | 'dark' => {
    if (!allowToggle) {
      if (defaultMode === 'system') {
        if (typeof window !== 'undefined') {
          return window.matchMedia('(prefers-color-scheme: dark)').matches
            ? 'dark'
            : 'light';
        }
        return 'light';
      }
      return defaultMode === 'dark' ? 'dark' : 'light';
    }
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedPrefs = window.localStorage.getItem('theme');
      if (storedPrefs === 'light' || storedPrefs === 'dark') {
        return storedPrefs;
      }
      const userMedia = window.matchMedia('(prefers-color-scheme: dark)');
      if (userMedia.matches) {
        return 'dark';
      }
    }
    return 'light';
  };

  // Objeto de store tipado para evitar problemas con la inferencia de 'this'
  const themeStore = {
    current: getInitialTheme(),

    init() {
      this.applyTheme(this.current);
    },

    toggle() {
      if (!allowToggle) return;
      this.current = this.current === 'dark' ? 'light' : 'dark';
      localStorage.setItem('theme', this.current);
      this.applyTheme(this.current);
    },

    applyTheme(theme: 'light' | 'dark') {
      if (typeof document !== 'undefined') {
        if (theme === 'dark') {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    },
  };

  // Registrar el store en Alpine casting a any para compatibilidad
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Alpine.store('theme', themeStore as any);
}
