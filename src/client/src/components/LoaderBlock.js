import React from 'react';
import { PropagateLoader } from 'react-spinners';
import withLoader from '../wrappers/withLoader';

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

// HashLoader
// RingLoader
// CircleLoader
// BounceLoader
// PropagateLoader
// GridLoader
// FadeLoader
