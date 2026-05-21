import type { Alpine } from 'alpinejs';

export default function (Alpine: Alpine) {
  Alpine.data('faqAccordion', () => ({
    activeIndex: null as number | null,
    toggle(index: number) {
      this.activeIndex = this.activeIndex === index ? null : index;
    },
    isOpen(index: number) {
      return this.activeIndex === index;
    },
    getClass(index: number) {
      return this.activeIndex === index
        ? 'rotate-180 text-primary dark:text-accent'
        : 'text-slate-400';
    },
  }));
}
