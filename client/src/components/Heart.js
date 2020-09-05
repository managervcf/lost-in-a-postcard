import React, { useState } from 'react';
import { useMutation } from 'react-apollo';
import { CLICK_PHOTO } from '../graphql/mutations';

const Heart = ({ id }) => {
  const [clicked, setClicked] = useState(false);
  const [clickPhoto, { loading, error, data }] = useMutation(CLICK_PHOTO);

  const showFilled = () => setClicked(true);
  const showEmpty = () => setClicked(false);

  return (
    <svg
      className="heart"
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
  );
};

export default Heart;
