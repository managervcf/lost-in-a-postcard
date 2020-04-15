import React, { useRef } from 'react';
import classnames from 'classnames';
import { transformUrl } from '../utils';
import { useOnScreen, useKeyPress } from '../hooks';

function PhotoImage({ upload, country, visible }) {
  const imageClasses = classnames({
    'gallery-image': true,
    dim: visible,
  });

  // Transform URL based on provided app options.
  const newUrl = transformUrl(upload.url);

  return <img className={imageClasses} src={newUrl} alt={country.name} />;
}

export default PhotoImage;
