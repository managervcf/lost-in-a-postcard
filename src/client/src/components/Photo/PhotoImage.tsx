import { Fade, Skeleton } from '@mui/material';
import React, { MouseEvent, useState } from 'react';
import { AWS_URL } from '../../constants';

export interface PhotoImageProps {
  country: {
    name: string;
  };
  upload: {
    key: string;
  };
}

export const PhotoImage: React.FC<PhotoImageProps> = ({ upload, country }) => {
  const [loaded, setLoaded] = useState(false);

  // Build the image url.
  const url = `${AWS_URL}${upload.key}`;

  return (
    <>
      <Fade in={loaded}>
        <img
          // Prevent downloading images through context menu.
          onContextMenu={(e: MouseEvent<HTMLImageElement>) => e.preventDefault()}
          onLoad={() => setLoaded(true)}
          style={{
            display: loaded ? 'block' : 'none',
            maxHeight: '85vh',
            width: 'auto',
            maxWidth: '95vw',
          }}
          src={url}
          alt={country.name ?? ''}
        />
      </Fade>
      <Fade in={!loaded}>
        <Skeleton
          variant="rectangular"
          animation="wave"
          width={600}
          height={600}
          sx={{
            display: !loaded ? 'block' : 'none',
            minWidth: 300,
            minHeight: 300,
            width: 'auto',
            maxHeight: '70vh',
            maxWidth: '95vw',
          }}
        />
      </Fade>
    </>
  );
};
