import React from 'react';
import { Link } from 'react-router-dom';
import withLoader from '../wrappers/withLoader';

function Logo() {
  return (
    <h1 className="heading-primary u-mb-medium">
      <Link to="/photos">Lost in a Postcard</Link>
    </h1>
  );
}

export default withLoader(Logo);
