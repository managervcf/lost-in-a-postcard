import React from 'react';
import { Query } from 'react-apollo';
import NavbarItem from './NavbarItem';
import { COUNTRIES } from '../graphql/queries';

const Navbar = () => (
  <Query query={COUNTRIES}>
    {({ data, loading, error }) => {
      if (error) return null;
      if (loading) return null;
      let navItems = data.countries
        // Sort alphabetically.
        .sort((a, b) => (a.name < b.name ? -1 : 1))
        .map(({ id, name }) => <NavbarItem key={id} countryName={name} />);

      return (
        <nav className="navbar">
          <ul className="navbar-list">{navItems}</ul>
        </nav>
      );
    }}
  </Query>
);

export default Navbar;
