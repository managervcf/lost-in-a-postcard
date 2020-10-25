import { useState, useEffect } from 'react';

/**
 * A custom hook that calculates the page scroll progress.
 */
export function useScrollProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    function followScroll() {
      const winScroll =
        document.body.scrollTop || document.documentElement.scrollTop;
      const height =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const scrolled = Math.round((winScroll / height) * 100);

      setProgress(scrolled);
    }

    document.addEventListener('scroll', followScroll);

    return () => document.removeEventListener('scroll', followScroll);
  }, [progress]);

  return { progress };
}
