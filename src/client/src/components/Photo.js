import React from 'react';

const Photo = ({ id, author, upload, country }) => {
	return <img className="gallery-image" src={upload.url} alt={country} />;
};

export default Photo;
