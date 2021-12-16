import React, { useState } from 'react';
import classnames from 'classnames';
import { useMutation } from 'react-apollo';
import { ClickPhotoData, ClickPhotoVars, CLICK_PHOTO, PHOTOS } from '../../../graphql';

interface HeartProps {
  id: string;
  clicks: number;
}

export const Heart: React.FC<HeartProps> = ({ id, clicks }) => {
  /**
   * Local storage version on a click.
   */
  // const { value: clicked, setter: setClicked } = useLocalStorage<boolean>(
  //   `photo_clicked_${id}|`,
  //   false
  // );
  const [clicked, setClicked] = useState(false);

  const [clickPhoto] = useMutation<ClickPhotoData, ClickPhotoVars>(CLICK_PHOTO, {
    refetchQueries: [{ query: PHOTOS }],
  });

  const heartClasses = classnames({
    heart: true,
    'heart-clicked': clicked,
  });

  const heartCounterClasses = classnames({
    'heart-counter': true,
    'heart-counter-hidden': !clicked,
    'heart-counter-visible': clicked,
  });

  /**
   * Handles the click event on the heart icon.
   * 1. Set the clicked state variable to true.
   * 2. If clicked is false, issue the clickPhoto mutation.
   */
  const handleHeartClick = () => {
    setClicked(true);

    if (!clicked) {
      clickPhoto({ variables: { id } });
    }
  };

  return (
    <div className={heartClasses}>
      <div className={heartCounterClasses}>{clicks}</div>
      <svg className="icon heart-icon" onPointerUp={handleHeartClick}>
        <use
          xlinkHref={`./assets/icons/icons.svg#icon-heart${clicked ? '' : '-outlined'}`}
        />
      </svg>
    </div>
  );
};
