import React from 'react';
import classnames from 'classnames';

import { transformUrl } from '../utils';

const PhotoImage = ({ upload, country, visible }) => {
  let imageClasses = classnames({
    'gallery-image': true,
    dim: visible
  });

  // Transform URL based on provided app options.
  let newUrl = transformUrl(upload.url);

  return (
    <img className={imageClasses} src={newUrl} alt={country.name} />
  );
};

export default PhotoImage;
