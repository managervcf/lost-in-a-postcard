import React, { useState, useRef } from 'react';
import { useQuery } from 'react-apollo';
import classnames from 'classnames';
import withLoader from '../wrappers/withLoader';
import PhotoImage from './PhotoImage';
import PhotoCaption from './PhotoCaption';
import Heart from './Heart';
import {
  useOnScreen,
  useOnScroll,
  useOnClickOutside,
  useOnClickInside,
} from '../hooks';
import { ME } from '../graphql/queries';

function PhotoItem(props) {
  const { loading, error, data } = useQuery(ME);

  // Returns a boolean indicating if ref is visible on screen.
  const ref = useRef();
  const onScreen = useOnScreen(ref, '-25%');
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
      <PhotoImage {...props} visible={data?.me && visible} />
      <Heart id={props.id} />
      {data?.me && <PhotoCaption {...props} visible={visible} />}
    </figure>
  );
}

export default withLoader(PhotoItem);
