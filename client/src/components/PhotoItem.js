import React, { useState, useRef } from 'react';
import classnames from 'classnames';
import withLoader from '../wrappers/withLoader';
import PhotoImage from './PhotoImage';
import PhotoCaption from './PhotoCaption';
import {
  // useKeyPress,
  useOnScreen,
  useOnScroll,
  useOnClickOutside,
  useOnClickInside,
} from '../hooks';

function PhotoItem(props) {
  // Returns a boolean indicating if ref is visible on screen.
  const ref = useRef();
  const onScreen = useOnScreen(ref, '-30%');
  const [visible, setVisible] = useState(false);

  /**
   * Hooks executing a handler function on certain events.
   * Show or hide caption.
   * Show - on element click
   * Hide - on scroll or on click outside element
   */
  const hideCaption = () => setVisible(false);
  const showCaption = () => setVisible(true);
  useOnScroll(() => setTimeout(hideCaption, 300));
  useOnClickOutside(ref, hideCaption);
  useOnClickInside(ref, showCaption);

  const photoItemClasses = classnames({
    'gallery-item': true,
    'fade-in': true,
    visible: onScreen,
  });

  return (
    <figure ref={ref} className={photoItemClasses}>
      <PhotoImage {...props} visible={visible} />
      <PhotoCaption {...props} visible={visible} />
    </figure>
  );
}

export default withLoader(PhotoItem);
