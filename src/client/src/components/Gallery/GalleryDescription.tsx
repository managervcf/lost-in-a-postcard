import React from 'react';
import { useQuery } from 'react-apollo';
import { withAnimation } from '../../wrappers';
import { COUNTRIES, CountriesData } from '../../graphql';

interface GalleryDescriptionProps {
  country?: string;
  featured: boolean;
}

function GalleryDescription({ country, featured }: GalleryDescriptionProps) {
  const { loading, error, data } = useQuery<CountriesData>(COUNTRIES);

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
