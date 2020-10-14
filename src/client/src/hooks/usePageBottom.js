import { useState, useEffect } from 'react';

/**
 * A custom hook that checks if the bottom of the page has been reached.
 * @param {number} offset
 * @returns {{ bottom: boolean }}
 */
export function usePageBottom(offset = 0) {
  const [bottom, setBottom] = useState(false);

  useEffect(() => {
    function handleScroll() {
      if (
        window.innerHeight + Math.round(window.scrollY) + offset >=
        document.body.offsetHeight
      ) {
        setBottom(true);
      } else {
        setBottom(false);
      }
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [bottom, offset]);

  return { bottom };
}
