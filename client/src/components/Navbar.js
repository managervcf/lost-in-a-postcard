import React from "react";
import { useQuery } from "react-apollo";
import NavbarItem from "./NavbarItem";
import { COUNTRIES } from "../graphql/queries";

const Navbar = () => {
  const { data, loading, error } = useQuery(COUNTRIES);

  // Handle error and loading states.
  if (error) return null;
  if (loading) return null;

  // Build navbar items.
  let navItems = data.countries
    // Sort alphabetically.
    .sort((a, b) => (a.name < b.name ? -1 : 1))
    .map(({ id, name }) => <NavbarItem key={id} countryName={name} />);

  return (
    <nav className="navbar">
      <ul className="navbar-list">{navItems}</ul>
    </nav>
  );
};

export default Navbar;
