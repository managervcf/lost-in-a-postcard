import React from 'react';
import { useQuery } from 'react-apollo';
import { COUNTRIES, CountriesData } from '../../graphql';

interface GalleryDescriptionProps {
  country?: string;
  featured?: boolean;
}

export const GalleryDescription: React.FC<GalleryDescriptionProps> = ({
  country,
  featured,
}) => {
  const { loading, error, data } = useQuery<CountriesData>(COUNTRIES);

  // Handle loading, error and description display.
  if (loading || error || !data) {
    return null;
  }

  // Find the country based on the url.
  const currentCountry = data.countries.find(
    ({ name }) => name.toLowerCase() === country?.toLowerCase()
  );
  return (
    <section className="gallery-description">
      {!currentCountry ? (
        featured ? (
          <p>Best photographs by Domi & Mateusz</p>
        ) : (
          <p>Photographs by Domi & Mateusz</p>
        )
      ) : (
        <>
          <p>Photographs from {currentCountry.name}</p>
          {currentCountry.description && (
            <p className="u-mt-small">{currentCountry.description}</p>
          )}
        </>
      )}
    </section>
  );
};
