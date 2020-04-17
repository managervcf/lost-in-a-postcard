import { useEffect } from 'react';

export function useOnScroll(handler) {
  useEffect(() => {
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, [handler]);

  return;
}
