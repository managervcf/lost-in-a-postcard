import React from 'react';
import { useScrollProgress } from '../../hooks';
import classnames from 'classnames';

interface ProgressBarProps {
  fixed?: boolean;
  value: number;
  max: number;
}

function ProgressBar({ fixed, value, max }: ProgressBarProps) {
  const { progress } = useScrollProgress();

  const progressBarClasses = classnames({
    'progress-bar': true,
    fixed,
  });

  return (
    <progress
      className={progressBarClasses}
      max={max ?? 100}
      value={value ?? progress}
    ></progress>
  );
}

export default ProgressBar;
