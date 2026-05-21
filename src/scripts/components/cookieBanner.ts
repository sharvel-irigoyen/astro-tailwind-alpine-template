import type { Alpine } from 'alpinejs';

export default function (Alpine: Alpine) {
  Alpine.data('cookieBanner', () => ({
    show: false,
    init() {
      setTimeout(() => {
        if (!localStorage.getItem('cookie-consent')) {
          this.show = true;
        }
      }, 1500);
    },
    accept() {
      localStorage.setItem('cookie-consent', 'accepted');
      this.show = false;
    },
    decline() {
      localStorage.setItem('cookie-consent', 'declined');
      this.show = false;
    },
  }));
}
