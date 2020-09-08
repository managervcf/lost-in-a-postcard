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

  const showFilled = () => setClicked(true);
  const showEmpty = () => setTimeout(() => setClicked(false), 1300);

  const heartCounterClasses = classnames({
    'heart-counter': true,
    'heart-counter-hidden': !clicked,
    'heart-counter-visible': clicked,
  });

  return (
    <div className="heart">
      <p className={heartCounterClasses}>{clicks}</p>
      <svg
        className="heart-icon"
        onPointerLeave={showEmpty}
        onPointerDown={showFilled}
        onPointerUp={() => clickPhoto({ variables: { id } })}
      >
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
