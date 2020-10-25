import React from 'react';
import { PropagateLoader } from 'react-spinners';
import { withAnimation } from '../../wrappers';

interface LoaderProps {
  loading: boolean;
  size?: number;
}

/**
 * Animated loading component.
 */
function Loader({ loading, size }: LoaderProps) {
  return (
    <div className="loader">
      <PropagateLoader
        css="transform: rotateZ(90deg);"
        size={size ?? 5}
        color={'#d9721e'}
        loading={loading}
      />
    </div>
  );
}

export default withAnimation(Loader);
