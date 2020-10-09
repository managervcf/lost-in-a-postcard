import React, { useState, useRef } from 'react';
import { useQuery } from 'react-apollo';
import classnames from 'classnames';
import PhotoImage from './PhotoImage';
import PhotoBack from './PhotoBack';
import Heart from '../Heart';
import { ME } from '../../graphql';
import {
  useOnScreen,
  useOnScroll,
  useOnClickOutside,
  useOnClickInside,
} from '../../hooks';

function Photo(props) {
  const { data } = useQuery(ME);

  // Returns a boolean indicating if ref is visible on screen.
  const ref = useRef();
  const onScreen = useOnScreen(ref, '-15%');
  const [visible, setVisible] = useState(false);

  /**
   * Hooks executing a handler function on certain events.
   * Show or hide caption.
   * Show - on element click
   * Hide - on scroll or on click outside element
   */
  const hideCaption = () => setVisible(false);
  const showCaption = () => setVisible(true);

  useOnScroll(() => setTimeout(hideCaption, 500));
  useOnClickOutside(ref, hideCaption);
  useOnClickInside(ref, showCaption);

  const photoClasses = classnames({
    'gallery-item': true,
    'fade-out': !onScreen,
    'fade-in': onScreen,
  });

  return (
    <figure ref={ref} className={photoClasses}>
      <PhotoImage
        upload={props.upload}
        country={props.country}
        dim={data?.me && visible}
      />
      {data?.me ? (
        <PhotoBack {...props} visible={visible} />
      ) : (
        <Heart id={props.id} clicks={props.clicks} />
      )}
    </figure>
  );
}

export default Photo;
