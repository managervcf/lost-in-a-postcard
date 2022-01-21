import React from 'react';
import { useScrollProgress } from '../../hooks';
import classnames from 'classnames';

interface ProgressBarProps {
  fixed?: boolean;
  value: number;
  max?: number;
  showProgress?: boolean;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  fixed = false,
  value = 0,
  max = 100,
  showProgress = false,
}) => {
  const { progress } = useScrollProgress();

  const progressBarClasses = classnames({
    'progress-bar': true,
    fixed,
  });

  return (
    <>
      <progress className={progressBarClasses} max={max} value={value ?? progress} />
      {showProgress && !!value && (
        <label className="progress-bar-text">
          {!!max ? Math.floor((value / max) * 100) : 100}%
        </label>
      )}
    </>
  );
};
