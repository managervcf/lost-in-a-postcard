import React from 'react';
import { Link } from 'react-router-dom';

import withLoader from '../wrappers/withLoader';

const Logo = () => (
  <div>
    <Link to="/photos">
      <h1 className="page-title">Lost in a Postcard</h1>
    </Link>
  </div>
);

export default withLoader(Logo);
