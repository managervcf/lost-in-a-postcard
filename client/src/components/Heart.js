import React, { useState } from 'react';

const Heart = () => {
  const [clicked, setClicked] = useState(false);

  const showFilled = () => setClicked(true);
  const showEmpty = () => setClicked(false);

  return (
    <svg
      className="heart"
      onPointerDown={showFilled}
      onPointerUp={showEmpty}
      onPointerLeave={showEmpty}
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
