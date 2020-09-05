import React from 'react';
import { useQuery } from 'react-apollo';
import withLoader from '../wrappers/withLoader';
import { COUNTRIES } from '../graphql/queries';

function PhotoGalleryDescription({ countryName, featured }) {
  const { loading, error, data } = useQuery(COUNTRIES);

  // Pull out country description.
  const { description } =
    data?.countries.find(({ name }) => name === countryName) || '';

  // Handle loading, error and description display.
  if (loading) return null;
  if (error) return null;
  if (!description && !featured) return null;

  return (
    <section className="gallery-description">
      {featured ? 'Portfolio Dominiki & Mateusza.' : description}
    </section>
  );
}

export default withLoader(PhotoGalleryDescription);
