import React from 'react';
import { PropagateLoader } from 'react-spinners';
import withLoader from '../../wrappers/withLoader';

/**
 * Animated loading component.
 * @param {{ loading?: boolean, size?: number }} props
 */
function Loader({ loading, size }) {
  return (
    <div className="loader">
      <PropagateLoader
        css={{ transform: 'rotateZ(90deg)' }}
        size={size ?? 5}
        color={'#d9721e'}
        loading={loading}
      />
    </div>
  );
}

export default withLoader(Loader);
