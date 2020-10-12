import React from 'react';
import { useQuery } from 'react-apollo';
import { withAnimation } from '../../wrappers';
import { COUNTRIES } from '../../graphql';

function GalleryDescription({ country, featured }) {
  const { loading, error, data } = useQuery(COUNTRIES);

  // Handle loading, error and description display.
  if (loading) return null;
  if (error) return null;
  if (!data) return null;

  // Find the country based on the url.
  const currentCountry = data.countries.find(
    ({ name }) => name.toLowerCase() === country?.toLowerCase()
  );

  return featured || currentCountry?.description ? (
    <section className="gallery-description">
      {featured
        ? 'Portfolio Dominiki & Mateusza.'
        : currentCountry?.description}
    </section>
  ) : null;
}

export default withAnimation(GalleryDescription);
