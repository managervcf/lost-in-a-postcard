import React from 'react';
import withLoader from '../wrappers/withLoader';
import { PropagateLoader } from 'react-spinners';

const LoaderBlock = ({ loading, size }) => (
  <div className="loader-block">
    <PropagateLoader
      css={{ transform: 'rotateZ(90deg)' }}
      size={size}
      color={'#929aab'}
      loading={loading}
    />
  </div>
);

export default withLoader(LoaderBlock);

// Available loaders
// HashLoader
// RingLoader
// CircleLoader
// BounceLoader
// PropagateLoader
// GridLoader
// FadeLoader
