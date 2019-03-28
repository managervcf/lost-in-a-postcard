import React, { useState } from 'react';

import withLoader from '../wrappers/withLoader';
import PhotoImage from './PhotoImage';
import PhotoCaption from './PhotoCaption';

const PhotoItem = props => {
	let [toggle, setToggle] = useState(false);

	return (
		<article
			className="gallery-item"
			onClick={() => setToggle(!toggle)}
			onWheel={() => setTimeout(() => setToggle(false), 1000)}
			onTouchMove={() => setTimeout(() => setToggle(false), 1000)}
		>
			<PhotoImage {...props} visible={toggle} />
			<PhotoCaption {...props} visible={toggle} />
		</article>
	);
};

export default withLoader(PhotoItem);
