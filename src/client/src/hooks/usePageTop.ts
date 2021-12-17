import { useState, useEffect } from 'react';

/**
 * A custom hook that checks if the top of the page has been reached.
 */
export function usePageTop(offset = 0) {
  const [top, setTop] = useState(true);

  useEffect(() => {
    function handleScroll() {
      if (offset >= Math.round(window.scrollY)) {
        setTop(true);
      } else {
        setTop(false);
      }
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [top, offset]);

  return { top };
}
