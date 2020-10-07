import React from 'react';
import { Link } from 'react-router-dom';
import withAnimation from '../../wrappers/withAnimation';

function Logo() {
  return (
    <h1 className="heading-primary u-mb-medium">
      <Link to="/">Lost in a Postcard</Link>
    </h1>
  );
}

export default withAnimation(Logo);
