import React from 'react';
import classnames from 'classnames';
import { transformUrl } from '../utils';

function PhotoImage({ upload, country, dim }) {
  const imageClasses = classnames({
    'gallery-image': true,
    dim,
  });

  // Build an image url.
  const url = `https://lost-in-a-postcard.s3-ap-southeast-2.amazonaws.com/${upload.key}`;

  return (
    <img
      className={imageClasses}
      // Transform URL based on provided app options.
      src={url}
      alt={country.name}
    />
  );
}

export default PhotoImage;
