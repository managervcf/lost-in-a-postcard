import React from 'react';
import { Link } from 'react-router-dom';
import withLoader from '../wrappers/withLoader';

const PhotoCaptionContent = ({ country, caption }) => (
	<div className="gallery-caption-content">
		<span className="gallery-caption-title">
			<Link to={`/photos/${country.name}`}>{country.name}</Link>
		</span>
		<span className="gallery-caption-description">{caption}</span>
	</div>
);

export default withLoader(PhotoCaptionContent);
