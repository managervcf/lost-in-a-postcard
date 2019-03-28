import React from 'react';
import classnames from 'classnames';

const PhotoImage = ({ upload, country, visible }) => {
	let imageClasses = classnames({
		'gallery-image': true,
		dim: visible
	});

	return <img className={imageClasses} src={upload.url} alt={country} />;
};

export default PhotoImage;
