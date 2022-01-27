import React, { MouseEvent } from 'react';
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
  // Build the image url.
  const url = `${AWS_URL}${upload.key}`;

  return (
    <img
      // Prevent downloading images through context menu.
      onContextMenu={(e: MouseEvent<HTMLImageElement>) => e.preventDefault()}
      style={{ maxHeight: '85vh', width: 'auto', maxWidth: '95vw' }}
      src={url}
      alt={country.name ?? ''}
    />
  );
};
