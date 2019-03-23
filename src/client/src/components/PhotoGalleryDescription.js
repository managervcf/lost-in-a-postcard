import React from 'react';
import { Query } from 'react-apollo';

import withLoader from '../wrappers/withLoader';
import { COUNTRIES } from '../graphql/queries';

const PhotoGalleryDescription = ({ countryName, featured }) => (
	<Query query={COUNTRIES}>
		{({ loading, error, data }) => {
			if (loading) return null;
			if (error) return null;
			let { description } =
				data.countries.find(({ name }) => name === countryName) || '';
			if (!description && !featured) return null;
			return (
				<div className="gallery-description">
					{featured ? 'Portfolio Dominiki & Mateusza.' : description}
				</div>
			);
		}}
	</Query>
);

export default withLoader(PhotoGalleryDescription);
