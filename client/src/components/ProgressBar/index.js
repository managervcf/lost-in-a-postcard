import React from 'react';
import { useScrollProgress } from '../../hooks';

function ProgressBar() {
  const { progress } = useScrollProgress();

  return (
    <progress className="progress-bar" max={100} value={progress}></progress>
  );
}

export default ProgressBar;
