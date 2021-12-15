import React from 'react';
import classnames from 'classnames';

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
  const url = `https://lost-in-a-postcard.s3-ap-southeast-2.amazonaws.com/${upload.key}`;

  return <img className={imageClasses} src={url} alt={country.name ?? ''} />;
};
