import React, { useRef } from 'react';
import { useQuery } from 'react-apollo';
import { PhotoImage } from './PhotoImage';
import { PhotoEdit } from './PhotoEdit';
import { Heart } from './Heart';
import { ME, MeData } from '../../graphql';
import { useOnScreen } from '../../hooks';
import { Camera } from './Camera';
import { Fade, Grid } from '@mui/material';
import { Box } from '@mui/system';

interface PhotoProps {
  id: string;
  clicks: number;
  region: string;
  caption: string;
  featured: boolean;
  country: {
    name: string;
  };
  upload: {
    key: string;
  };
  author: {
    username: string;
  };
}

export const Photo: React.FC<PhotoProps> = props => {
  const { data } = useQuery<MeData>(ME);

  // Returns a boolean indicating if ref is visible on screen.
  const ref = useRef<HTMLElement>(null);
  const onScreen = useOnScreen(ref, '-40%');

  return (
    <Fade in={onScreen} timeout={500}>
      <Grid item>
        <Box position="relative" ref={ref}>
          <Box>
            <PhotoImage upload={props.upload} country={props.country} />
          </Box>
          {data?.me && (
            <Box position="absolute" bottom="1.5rem" left="2rem">
              <PhotoEdit {...props} />
            </Box>
          )}
          <Camera
            country={props.country.name}
            region={props.region}
            caption={props.caption}
          />
          <Heart id={props.id} clicks={props.clicks} />
        </Box>
      </Grid>
    </Fade>
  );
};
