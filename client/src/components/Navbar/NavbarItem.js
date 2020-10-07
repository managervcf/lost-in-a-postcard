import React from 'react';
import { NavLink } from 'react-router-dom';
import withAnimation from '../../wrappers/withAnimation';

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

export default withAnimation(NavbarItem);
