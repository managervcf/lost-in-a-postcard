import { useEffect } from 'react';
import { usePageBottom, usePageTop } from '.';
import { BACKGROUND_COLOR, BACKGROUND_COLOR_DIM } from '../constants';

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
  const { bottom } = usePageBottom(offsetBottom ?? 100);
  const { top } = usePageTop(offsetTop ?? 100);

  useEffect(() => {
    if (top || bottom) {
      document.body.style.backgroundColor = color ?? BACKGROUND_COLOR;
    } else {
      document.body.style.backgroundColor = colorDim ?? BACKGROUND_COLOR_DIM;
    }
  }, [top, bottom, color, colorDim]);
};
