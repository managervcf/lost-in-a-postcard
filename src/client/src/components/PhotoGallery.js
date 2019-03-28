import React from 'react';
import { Query } from 'react-apollo';
import { withRouter } from 'react-router-dom';

import PhotoItem from './PhotoItem';
import PhotoGalleryDescription from './PhotoGalleryDescription';
import LoaderBlock from './LoaderBlock';
import ErrorMessage from './ErrorMessage';

import { PHOTOS } from '../graphql/queries';
import { shuffle } from '../utils';

const PhotoGallery = ({ location, match }) => {
	// Build a query depending on url.
	let query = {};
	// If url match is not exact, pull out parameters.
	if (!match.isExact) {
		// If url contains featured, add featured = true as a variable.
		if (location.pathname === '/photos/featured') {
			query.featured = true;
		} else {
			// If url is not exact and it is not featured, add as country.
			query.country = location.pathname.replace(`${match.path}/`, '');
		}
	}

	return (
		<Query query={PHOTOS} variables={query}>
			{({ data, loading, error }) => {
				if (error) return <ErrorMessage text="Cannot load gallery :(" />;
				if (loading) return <LoaderBlock size={5} loading={loading} />;
				if (data.photos.docs.length === 0)
					return <ErrorMessage text="No photos found :(" />;

				let shuffledPhotos = shuffle(data.photos.docs);

				let galleryItems = shuffledPhotos.map((photo, index) => (
					<PhotoItem key={photo.id} {...photo} />
				));

				return (
					<section className="gallery">
						<PhotoGalleryDescription
							countryName={query.country}
							featured={query.featured}
						/>
						{galleryItems}
					</section>
				);
			}}
		</Query>
	);
};

export default withRouter(PhotoGallery);
