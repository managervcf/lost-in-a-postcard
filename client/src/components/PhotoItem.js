import React, { useState } from 'react';
import withLoader from '../wrappers/withLoader';
import PhotoImage from './PhotoImage';
import PhotoCaption from './PhotoCaption';

function PhotoItem(props) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <figure
      className="gallery-item"
      onMouseOver={() => setIsVisible(true)}
      onMouseLeave={() => setIsVisible(false)}
      onTouchMove={() => setTimeout(() => setIsVisible(false), 1000)}
      onScroll={() => setTimeout(() => setIsVisible(false), 1000)}
    >
      <PhotoImage {...props} visible={isVisible} />
      <PhotoCaption {...props} visible={isVisible} />
    </figure>
  );
}

export default withLoader(PhotoItem);
