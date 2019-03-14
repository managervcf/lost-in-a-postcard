import React from 'react';

import Photo from './Photo';
import Caption from './Caption';

const GalleryItem = props => (
	<div className="gallery-item">
		<Photo {...props} />
		<Caption {...props} />
	</div>
);

export default GalleryItem;
