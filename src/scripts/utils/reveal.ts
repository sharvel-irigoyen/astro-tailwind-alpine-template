/**
 * Scroll Reveal Utility using Motion (WAAPI) and IntersectionObserver
 * Handles dynamic import of motion to keep initial bundle size at 0.
 */
export function initReveal() {
  const elements = document.querySelectorAll('.reveal');
  if (elements.length === 0) return;

  const observer = new IntersectionObserver(
    async (entries) => {
      let motionImported: typeof import('motion') | null = null;

      for (const entry of entries) {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;

          // Lazy load Motion library only when the first element intersects
          if (!motionImported) {
            motionImported = await import('motion');
          }

          const direction = target.dataset.revealDirection || 'up';
          const delay = parseFloat(target.dataset.revealDelay || '0');
          const duration = parseFloat(target.dataset.revealDuration || '0.6');

          let x = 0;
          let y = 0;

          if (direction === 'up') y = 30;
          else if (direction === 'down') y = -30;
          else if (direction === 'left') x = 30;
          else if (direction === 'right') x = -30;

          motionImported.animate(
            target,
            {
              opacity: [0, 1],
              x: [x, 0],
              y: [y, 0],
            },
            {
              duration,
              delay,
              easing: 'ease-out',
            },
          );

          // Once animated, stop observing this element
          observer.unobserve(target);
        }
      }
    },
    {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px', // Trigger slightly before it hits the viewport fully
    },
  );

  elements.forEach((el) => observer.observe(el));
}
