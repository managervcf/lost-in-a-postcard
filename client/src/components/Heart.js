import React, { useState } from 'react';
import classnames from 'classnames';
import { useMutation } from 'react-apollo';
import { CLICK_PHOTO, PHOTOS } from '../graphql';

function Heart({ id, clicks }) {
  const [clicked, setClicked] = useState(false);
  const [clickPhoto] = useMutation(CLICK_PHOTO, {
    refetchQueries: [{ query: PHOTOS }],
  });

  /**
   * Toggles the heart icon style.
   * @param {boolean} showFilled
   */
  const toggleFilled = (showFilled = true) => setClicked(showFilled);

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
    toggleFilled();
    if (!clicked) {
      clickPhoto({ variables: { id } });
    }
  };

  return (
    <div className="heart">
      <p className={heartCounterClasses}>{clicks}</p>
      <svg className="icon" onPointerUp={handleHeartClick}>
        <use
          xlinkHref={`./assets/icons/icons.svg#icon-heart${
            clicked ? '' : '-outlined'
          }`}
        ></use>
      </svg>
    </div>
  );
}

export default Heart;
