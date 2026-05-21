import type { Alpine } from 'alpinejs';

export default function (Alpine: Alpine) {
  Alpine.data('navigationHeader', () => ({
    mobileMenuOpen: false,
    toggleMenu() {
      this.mobileMenuOpen = !this.mobileMenuOpen;
    },
    closeMenu() {
      this.mobileMenuOpen = false;
    },
    toggleTheme() {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      (this as any).$store.theme.toggle();
    },
    isDark() {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (this as any).$store.theme.current === 'dark';
    },
    isLight() {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      return (this as any).$store.theme.current === 'light';
    },
    get overlayClasses() {
      return this.mobileMenuOpen
        ? 'opacity-100 pointer-events-auto'
        : 'opacity-0 pointer-events-none';
    },
    get sidebarClasses() {
      return this.mobileMenuOpen ? 'translate-x-0' : 'translate-x-full';
    },
    get parentClasses() {
      return this.mobileMenuOpen ? 'visible' : 'invisible';
    },
  }));
}
