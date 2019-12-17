import React from 'react';
import withLoader from '../wrappers/withLoader';
import { ClipLoader } from 'react-spinners';

const LoaderInline = ({ loading, size }) => (
  <span className="loader-inline">
    <ClipLoader size={size} color={'#929aab'} loading={loading} />
  </span>
);

export default withLoader(LoaderInline);

// Available loaders
// HashLoader
// RingLoader
// CircleLoader
// BounceLoader
// PropagateLoader
// GridLoader
// FadeLoader
