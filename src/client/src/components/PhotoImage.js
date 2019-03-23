import React from 'react';

const PhotoImage = ({ upload, country }) => (
	<img className="gallery-image" src={upload.url} alt={country} />
);

export default PhotoImage;
