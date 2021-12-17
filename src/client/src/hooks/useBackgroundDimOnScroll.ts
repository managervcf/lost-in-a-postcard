import { useEffect } from 'react';
import { usePageBottom, usePageTop } from '.';

interface UseBackgroundDimOnScrollArgs {
  offsetBottom?: number;
  offsetTop?: number;
  color?: string;
  colorDim?: string;
}

export const useBackgroundDimOnScroll = ({
  offsetBottom,
  offsetTop,
  color,
  colorDim,
}: UseBackgroundDimOnScrollArgs = {}) => {
  const { bottom } = usePageBottom(offsetBottom ?? 50);
  const { top } = usePageTop(offsetTop ?? 100);

  useEffect(() => {
    if (top || bottom) {
      document.body.style.backgroundColor = color ?? 'rgba(0, 0, 0, 0.03)';
    } else {
      document.body.style.backgroundColor = colorDim ?? 'rgba(0, 0, 0, 0.6)';
    }
  }, [top, bottom, color, colorDim]);
};
