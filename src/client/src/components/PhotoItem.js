import React from 'react';
import withLoader from '../wrappers/withLoader';

import PhotoImage from './PhotoImage';
import PhotoCaption from './PhotoCaption';

const PhotoItem = props => (
	<article className="gallery-item">
		<PhotoImage {...props} />
		<PhotoCaption {...props} />
	</article>
);

export default withLoader(PhotoItem);
