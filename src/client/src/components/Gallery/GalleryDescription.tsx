import { Grid, Typography } from '@mui/material';
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
    <Grid item m={1}>
      {!currentCountry ? (
        featured ? (
          <Typography>Best photographs by Domi & Mateusz</Typography>
        ) : (
          <Typography>Photographs by Domi & Mateusz</Typography>
        )
      ) : (
        <>
          <Typography>Photographs from {currentCountry.name}</Typography>
          {currentCountry.description && (
            <Typography>{currentCountry.description}</Typography>
          )}
        </>
      )}
    </Grid>
  );
};
