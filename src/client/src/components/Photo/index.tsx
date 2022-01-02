import React, { useState, useRef } from 'react';
import { useQuery } from 'react-apollo';
import classnames from 'classnames';
import { PhotoImage } from './PhotoImage';
import { PhotoDetails } from './PhotoDetails';
import { Heart } from './Heart';
import { ME, MeData } from '../../graphql';
import { useOnScreen, useOnClickOutside, useOnClickInside } from '../../hooks';
import { Camera } from './Camera';

interface PhotoProps {
  id: string;
  clicks: number;
  region: string;
  caption: string;
  featured: boolean;
  country: {
    name: string;
  };
  upload: {
    key: string;
  };
  author: {
    username: string;
  };
}

export const Photo: React.FC<PhotoProps> = props => {
  const { data } = useQuery<MeData>(ME);

  // Returns a boolean indicating if ref is visible on screen.
  const ref = useRef<HTMLElement>(null);
  const onScreen = useOnScreen(ref, '-40%');
  const [visible, setVisible] = useState(false);

  /**
   * Hooks executing a handler function on certain events.
   * Show or hide caption.
   * Show - on element click
   * Hide - on scroll or on click outside element
   */
  const hideCaption = () => setVisible(false);
  const showCaption = () => setVisible(true);

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
        dim={!!data?.me && visible}
      />
      {data?.me ? (
        <PhotoDetails {...props} visible={visible} />
      ) : (
        <>
          <Camera
            country={props.country.name}
            region={props.region}
            caption={props.caption}
          />
          <Heart id={props.id} clicks={props.clicks} />
        </>
      )}
    </figure>
  );
};
