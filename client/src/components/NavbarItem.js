import React from 'react';
import { NavLink } from 'react-router-dom';
import withLoader from '../wrappers/withLoader';

function NavbarItem({ countryName }) {
  return (
    <NavLink
      className="navbar-item"
      activeStyle={{ fontWeight: 'bold' }}
      to={`/photos/${countryName.toLowerCase()}`}
    >
      {countryName}
    </NavLink>
  );
}

export default withLoader(NavbarItem);
