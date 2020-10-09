import React from 'react';
import { useScrollProgress } from '../../hooks';
import classnames from 'classnames';

function ProgressBar({ fixed, value, max }) {
  const { progress } = useScrollProgress();

  const progressBarClasses = classnames({
    'progress-bar': true,
    fixed,
  });

  return (
    <progress
      className={progressBarClasses}
      max={max ?? 100}
      value={value ?? (progress || 0)}
    ></progress>
  );
}

export default ProgressBar;
