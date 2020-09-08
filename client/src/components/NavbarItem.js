import React from 'react';
import { NavLink } from 'react-router-dom';
import withLoader from '../wrappers/withLoader';

function NavbarItem({ countryName }) {
  return (
    <NavLink
      className="navbar-item"
      activeStyle={{ color: '#d9721e', transition: 'all 0.3s' }}
      to={`/photos/${countryName.toLowerCase()}`}
    >
      {countryName}
    </NavLink>
  );
}

export default withLoader(NavbarItem);
