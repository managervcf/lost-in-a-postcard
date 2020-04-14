import React, { useRef } from 'react';
import classnames from 'classnames';
import { transformUrl } from '../utils';
import { useOnScreen } from '../hooks/use-on-screen';

function PhotoImage({ upload, country, visible }) {
  const ref = useRef();
  // Call the hook passing in ref and root margin
  // In this case it would only be considered onScreen if more ...
  // ... than 300px of element is visible.
  const onScreen = useOnScreen(ref, '-300px');
  const imageClasses = classnames({
    'gallery-image': true,
    dim: visible,
  });

  // Transform URL based on provided app options.
  const newUrl = transformUrl(upload.url);

  return (
    <img
      ref={ref}
      className={imageClasses}
      src={newUrl}
      alt={country.name}
      // style={{ opacity: onScreen ? '0.2' : '1' }}
    />
  );
}

export default PhotoImage;
