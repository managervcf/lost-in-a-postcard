import React from 'react';
import { NavLink } from 'react-router-dom';
import { MeData } from '../../graphql';

interface NavbarItemProps {
  amount?: number;
  countryName?: string;
  featured?: boolean;
  user?: MeData['me'] | null;
}

export const NavbarItem: React.FC<NavbarItemProps> = ({
  amount,
  countryName,
  featured,
  user,
}) => (
  <NavLink
    className={({ isActive }) => `navbar-item ${isActive ? 'navbar-item-active' : ''}`}
    to={`/photos/${countryName ? countryName.replaceAll(' ', '-').toLowerCase() : 'all'}${
      featured ? '/featured' : ''
    }`}
    end
  >
    {featured ? 'Best' : !countryName ? 'All' : countryName}
    {user ? ` (${amount})` : ''}
  </NavLink>
);
