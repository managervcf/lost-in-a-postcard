import { useEffect } from 'react';

/**
 * A custom hook that moves the background on scroll to achieve a parallax effect.
 */
export function useParallax(speed: number = 0.05) {
  useEffect(() => {
    function doParallax() {
      const positionY = window.pageYOffset / 2;
      document.body.style.backgroundPosition = '0 -' + positionY * speed + 'px';
    }

    window.addEventListener('scroll', doParallax);

    return () => window.removeEventListener('scroll', doParallax);
  });
}
