import React from 'react';
import classnames from 'classnames';

const PhotoImage = ({ upload, country, visible }) => {
  let imageClasses = classnames({
    'gallery-image': true,
    dim: visible
  });

  // Transform an image.
  // quality accepts a number 1-100, 'auto', 'auto:low', 'auto:eco', 'auto:good' or 'auto:best'.
  let quality = 'auto';
  // Determine width of the photo needed. height will automatically adjust to preserve aspect ratio.
  let width = 1000;
  // Build transformation string used in url.
  let transformations = `f_auto,q_${quality},w_${width}`;

  // Build new url with all transformation details.
  let transformedUrl = upload.url.replace(
    '/upload',
    `/upload/${transformations}`
  );
  console.log(transformedUrl);

  return (
    <img className={imageClasses} src={transformedUrl} alt={country.name} />
  );
};

export default PhotoImage;
