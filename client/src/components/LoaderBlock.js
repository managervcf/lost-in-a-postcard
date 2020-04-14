import React from 'react';
import { PropagateLoader } from 'react-spinners';
import withLoader from '../wrappers/withLoader';

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

// Available loaders
// HashLoader
// RingLoader
// CircleLoader
// BounceLoader
// PropagateLoader
// GridLoader
// FadeLoader
