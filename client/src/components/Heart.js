import React, { useState } from 'react';
import classnames from 'classnames';
import { useMutation } from 'react-apollo';
import { CLICK_PHOTO } from '../graphql/mutations';
import { PHOTOS } from '../graphql/queries';

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

  const handleHeartClick = () => {
    toggleFilled();
    clickPhoto({ variables: { id } });
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
