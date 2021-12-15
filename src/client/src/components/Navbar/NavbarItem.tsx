import React from 'react';
import { NavLink } from 'react-router-dom';

interface NavbarItemProps {
  countryName?: string;
  featured?: boolean;
}

export const NavbarItem: React.FC<NavbarItemProps> = ({ countryName, featured }) => (
  <NavLink
    className={({ isActive }) => `navbar-item ${isActive ? 'navbar-item-active' : ''}`}
    to={`/photos/${countryName ? countryName.replaceAll(' ', '-').toLowerCase() : 'all'}${
      featured ? '/featured' : ''
    }`}
    end
  >
    {featured ? 'Best' : !countryName ? 'All' : countryName}
  </NavLink>
);
