import React from 'react';
import { Link } from 'react-router-dom';
import Errors from './Errors';

function NoMatch() {
  return (
    <>
      <Errors text="Oops! Page you are looking for does not exist." />
      <button className="button">
        <Link to="/">Return to the main page.</Link>
      </button>
    </>
  );
}

export default NoMatch;
