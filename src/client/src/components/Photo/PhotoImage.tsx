import React from 'react';
import classnames from 'classnames';
import { AWS_URL } from '../../constants';

export interface PhotoImageProps {
  dim: boolean;
  country: {
    name: string;
  };
  upload: {
    key: string;
  };
}

export const PhotoImage: React.FC<PhotoImageProps> = ({ upload, country, dim }) => {
  const imageClasses = classnames({ dim, 'gallery-image': true });

  // Build the image url.
  const url = `${AWS_URL}${upload.key}`;

  return <img className={imageClasses} src={url} alt={country.name ?? ''} />;
};
