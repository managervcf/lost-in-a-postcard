import { useState, useEffect, RefObject } from 'react';

// Hook
export function useOnScreen(ref: RefObject<any>, rootMargin = '0px', threshold = 0) {
  // State and setter for storing whether element is visible
  const [isIntersecting, setIntersecting] = useState(false);

  useEffect(() => {
    const element = ref.current;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Update our state when observer callback fires
        setIntersecting(entry.isIntersecting);
      },
      { rootMargin, threshold }
    );
    if (element) {
      observer.observe(element);
    }
    return () => {
      observer.unobserve(element);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Empty array ensures that effect is only run on mount and unmount

  return isIntersecting;
}
