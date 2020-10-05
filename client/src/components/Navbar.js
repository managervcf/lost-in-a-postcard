import React from 'react';
import { useQuery } from 'react-apollo';
import NavbarItem from './NavbarItem';
import { COUNTRIES } from '../graphql';

function Navbar() {
  const { data, loading, error } = useQuery(COUNTRIES);

  // Handle error and loading states.
  if (error) return null;
  if (loading) return null;

  /**
   * Build the navbar items and sort them alphabetically.
   */
  const navItems = data?.countries
    .sort((a, b) => (a.name < b.name ? -1 : 1))
    .map(({ id, name }) => <NavbarItem key={id} countryName={name} />);

  return (
    <nav className="navbar u-mb-small u-mt-small">
      <ul className="navbar-list">{navItems}</ul>
    </nav>
  );
}

export default Navbar;
