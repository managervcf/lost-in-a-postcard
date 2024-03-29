import { useRef } from 'react';
import { useQuery } from 'react-apollo';
import { Fade, Grid, Box } from '@mui/material';
import { PhotoImage } from './PhotoImage';
import { PhotoEdit } from './PhotoEdit';
import { Location } from './Location';
import { Heart } from './Heart';
import { ME, MeData } from '../../graphql';
import { useOnScreen } from '../../hooks';
import { Featured } from '../common';

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
}

export const Photo: React.FC<PhotoProps> = props => {
  const { data } = useQuery<MeData>(ME);

  // Returns a boolean indicating if `ref` is visible on screen.
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
            <>
              <Box position="absolute" bottom="1rem" left="1.5rem">
                <PhotoEdit {...props} />
              </Box>
              <Fade in={props.featured}>
                <Box position="absolute" bottom="1rem" left="5.5rem">
                  <Featured id={props.id} featured={props.featured} star />
                </Box>
              </Fade>
            </>
          )}
          <Location {...props} country={props.country.name} />
          <Heart id={props.id} clicks={props.clicks} />
        </Box>
      </Grid>
    </Fade>
  );
};
