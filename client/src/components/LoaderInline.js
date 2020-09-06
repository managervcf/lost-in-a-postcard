import React from 'react';
import { ClipLoader } from 'react-spinners';
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

function LoaderInline({ loading, size }) {
  return (
    <span className="loader-inline">
      <ClipLoader size={size} color={'#d9721e'} loading={loading} />
    </span>
  );
}

export default withLoader(LoaderInline);
