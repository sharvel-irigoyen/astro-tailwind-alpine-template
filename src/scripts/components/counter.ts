import type { Alpine } from 'alpinejs';

export default function (Alpine: Alpine) {
  Alpine.data('counter', () => ({
    count: 0,
    increment() {
      this.count++;
    },
    decrement() {
      if (this.count > 0) this.count--;
    },
  }));
}
