import React from 'react';
import { PropagateLoader } from 'react-spinners';
import withLoader from '../wrappers/withLoader';

/**
 * List of available loaders:
 * HashLoader
 * RingLoader
 * CircleLoader
 * BounceLoader
 * PropagateLoader
 * GridLoader
 * FadeLoader
 */

function LoaderBlock({ loading, size }) {
  return (
    <div className="loader-block">
      <PropagateLoader
        css={{ transform: 'rotateZ(90deg)' }}
        size={size}
        color={'#929aab'}
        loading={loading}
      />
    </div>
  );
}

export default withLoader(LoaderBlock);
