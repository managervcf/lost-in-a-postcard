import React, { useState } from 'react';
import { useMutation } from 'react-apollo';
import { CLICK_PHOTO } from '../graphql/mutations';
import { PHOTOS } from '../graphql/queries';

const Heart = ({ id, clicks }) => {
  const [clicked, setClicked] = useState(false);
  const [clickPhoto] = useMutation(CLICK_PHOTO, {
    refetchQueries: [{ query: PHOTOS }],
  });

  const showFilled = () => setClicked(true);
  const showEmpty = () => setClicked(false);

  return (
    <div className="heart">
      <p className="heart-counter">{clicks}</p>
      <svg
        className="heart-icon"
        onPointerLeave={showEmpty}
        onPointerDown={showFilled}
        onPointerUp={() => {
          clickPhoto({ variables: { id } });
          showEmpty();
        }}
      >
        <use
          xlinkHref={`./assets/icons/icons.svg#icon-heart${
            clicked ? '' : '-outlined'
          }`}
        ></use>
      </svg>
    </div>
  );
};

export default Heart;
