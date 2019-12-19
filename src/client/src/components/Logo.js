import React from 'react';
import { Link } from 'react-router-dom';

import withLoader from '../wrappers/withLoader';

const Logo = () => (
  <Link to="/photos">
    <h1 className="page-title">Lost in a Postcard</h1>
  </Link>
);

export default withLoader(Logo);
