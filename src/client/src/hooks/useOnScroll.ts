import { useEffect } from 'react';

export function useOnScroll(handler: EventListenerObject['handleEvent']) {
  useEffect(() => {
    window.addEventListener('scroll', handler);
    return () => window.removeEventListener('scroll', handler);
  }, [handler]);

  return;
}
