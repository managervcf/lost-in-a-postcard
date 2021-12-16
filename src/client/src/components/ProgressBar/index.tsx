import React from 'react';
import { useScrollProgress } from '../../hooks';
import classnames from 'classnames';

interface ProgressBarProps {
  fixed?: boolean;
  value?: number;
  max?: number;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  fixed = false,
  value,
  max = 100,
}) => {
  const { progress } = useScrollProgress();

  const progressBarClasses = classnames({
    'progress-bar': true,
    fixed,
  });

  return (
    <progress
      className={progressBarClasses}
      max={max}
      value={value ?? progress}
    ></progress>
  );
};
