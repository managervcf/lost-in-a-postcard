import React from 'react';
import { Link } from 'react-router-dom';
import Error from '../common/Error';

function NotFound() {
  return (
    <>
      <Error text="Page you are looking for does not exist" />
      <button className="button">
        <Link to="/">Main page</Link>
      </button>
    </>
  );
}

export default NotFound;
