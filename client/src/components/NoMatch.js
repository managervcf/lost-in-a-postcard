import React from 'react';
import { Link } from 'react-router-dom';
import ErrorMessage from './ErrorMessage';

function NoMatch() {
  return (
    <>
      <ErrorMessage text="Oops! Page you are looking for does not exist." />
      <button>
        <Link to="/">Return to the main page.</Link>
      </button>
    </>
  );
}

export default NoMatch;
