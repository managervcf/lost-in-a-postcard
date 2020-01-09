import React from 'react';
import { Link } from 'react-router-dom';

import withLoader from '../wrappers/withLoader';

const Logo = () => (
  <h1 className="page-title">
    <Link to="/photos">Lost in a Postcard</Link>
  </h1>
);

export default withLoader(Logo);
