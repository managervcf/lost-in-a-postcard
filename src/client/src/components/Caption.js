import React from 'react';

const Caption = ({ country, featured, caption }) => (
	<div className="gallery-caption">
		<span className="gallery-caption-title">{country}</span>
		<span className="gallery-caption-description">{caption}</span>
		{featured && <span>This photo is featured!</span>}
	</div>
);

export default Caption;
