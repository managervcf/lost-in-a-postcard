import React, { useState } from 'react';

import withLoader from '../wrappers/withLoader';
import PhotoImage from './PhotoImage';
import PhotoCaption from './PhotoCaption';

const PhotoItem = props => {
  let [isVisible, setIsVisible] = useState(false);

  return (
    <article
      className="gallery-item"
      onClick={() => setIsVisible(!isVisible)}
      onWheel={() => setTimeout(() => setIsVisible(false), 1000)}
      onTouchMove={() => setTimeout(() => setIsVisible(false), 1000)}
    >
      <PhotoImage {...props} visible={isVisible} />
      <PhotoCaption {...props} visible={isVisible} />
    </article>
  );
};

export default withLoader(PhotoItem);
