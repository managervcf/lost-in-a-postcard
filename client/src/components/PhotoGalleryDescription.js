import React from 'react';
import { useQuery } from 'react-apollo';
import withLoader from '../wrappers/withLoader';
import { COUNTRIES } from '../graphql';

function PhotoGalleryDescription({ countryName, featured }) {
  const { loading, error, data } = useQuery(COUNTRIES);

  // Handle loading, error and description display.
  if (loading) return null;
  if (error) return null;
  if (!data) return null;

  // Find the country based on the url.
  const country = data.countries.find(
    ({ name }) => name.toLowerCase() === countryName
  );

  return (
    <section className="gallery-description">
      {featured ? 'Portfolio Dominiki & Mateusza.' : country?.description}
    </section>
  );
}

export default withLoader(PhotoGalleryDescription);
