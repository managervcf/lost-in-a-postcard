import React from 'react';
import classnames from 'classnames';

function PhotoImage({ upload, country, dim }) {
  const imageClasses = classnames({
    'gallery-image': true,
    dim,
  });

  // Build the image url.
  const url = `https://lost-in-a-postcard.s3-ap-southeast-2.amazonaws.com/${upload.key}`;

  return (
    <img className={imageClasses} src={url} alt={country?.name ?? 'none'} />
  );
}

export default PhotoImage;
