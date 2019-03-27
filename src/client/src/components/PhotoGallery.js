import React from 'react';
import { Query } from 'react-apollo';
import { withRouter } from 'react-router-dom';

import PhotoItem from './PhotoItem';
import PhotoGalleryDescription from './PhotoGalleryDescription';
import LoaderBlock from './LoaderBlock';
import ErrorMessage from './ErrorMessage';
import { PHOTOS } from '../graphql/queries';

const PhotoGallery = ({ location, match }) => {
	// Build a query depending on url.
	let query = {};
	if (!match.isExact) {
		if (location.pathname === '/photos/featured') {
			query.featured = true;
		} else {
			query.country = location.pathname.replace(`${match.path}/`, '');
		}
	}

	return (
		<Query query={PHOTOS} variables={query}>
			{({ data, loading, error }) => {
				if (error) return <ErrorMessage text="Cannot load gallery :(" />;
				if (loading) return <LoaderBlock size={5} loading={loading} />;

				let galleryItems =
					data.photos.docs.length > 0 ? (
						data.photos.docs.map((photo, index) => (
							<PhotoItem key={photo.id} {...photo} />
						))
					) : (
						<ErrorMessage text="No photos found :(" />
					);

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
