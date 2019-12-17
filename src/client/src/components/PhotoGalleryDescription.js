import React from 'react';
import { useQuery } from 'react-apollo';

import withLoader from '../wrappers/withLoader';
import { COUNTRIES } from '../graphql/queries';

const PhotoGalleryDescription = ({ countryName, featured }) => {
  const { loading, error, data } = useQuery(COUNTRIES);
  
  // Pull out country description.
  let { description } =
    data.countries.find(({ name }) => name === countryName) || '';

  // Handle loading, error and description display.
  if (loading) return null;
  if (error) return null;
  if (!description && !featured) return null;

  return (
    <div className="gallery-description">
      {featured ? 'Portfolio Dominiki & Mateusza.' : description}
    </div>
  );
};

export default withLoader(PhotoGalleryDescription);
