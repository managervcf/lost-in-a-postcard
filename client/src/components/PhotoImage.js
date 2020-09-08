import React from 'react';
import classnames from 'classnames';
import { transformUrl } from '../utils';

function PhotoImage({ upload, country, dim }) {
  const imageClasses = classnames({
    'gallery-image': true,
    dim,
  });

  return (
    <img
      className={imageClasses}
      // Transform URL based on provided app options.
      src={transformUrl(upload.url)}
      alt={country.name}
    />
  );
}

export default PhotoImage;
