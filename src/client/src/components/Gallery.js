import React from 'react';
import { Query } from 'react-apollo';

import GalleryItem from './GalleryItem';
import PHOTOS from '../graphql/queries/photos';

const Gallery = ({ match }) => {
	const { country } = match.params;
	// Build query variables object based on url params.
	// If '/' add { featured: true }, otherwise { country }
	const queryVariables = !country ? {} : { country };

	return (
		<div className="gallery">
			<Query query={PHOTOS} variables={queryVariables}>
				{({ data, loading, error, client }) => {
					console.log("Cache", client.cache);
					if (error) return <p>Cannot load gallery :(</p>;
					if (loading) return <p>Loading gallery...</p>;
					return data.photos.docs.map((photo, index) => (
						<GalleryItem key={index} {...photo} />
					));
				}}
			</Query>
		</div>
	);
};

export default Gallery;
