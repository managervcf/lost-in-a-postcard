import { useQuery } from 'react-apollo';
import { NavbarItem } from './NavbarItem';
import { COUNTRIES, CountriesData } from '../../graphql';
import { useParallax } from '../../hooks';

export const Navbar: React.FC = () => {
  const { data, loading, error } = useQuery<CountriesData>(COUNTRIES);

  // Create a background parallax effect.
  useParallax();

  // Handle error, loading and no data states.
  if (loading || error || !data) {
    return null;
  }

  /**
   * Build the navbar items and sort them alphabetically.
   */
  const navItems = data.countries
    .sort((a, b) => a.name.localeCompare(b.name))
    .map(({ id, name }) => <NavbarItem key={id} countryName={name} />);

  return (
    <nav className="navbar u-mt-small">
      <ul className="navbar-list">
        <NavbarItem />
        <NavbarItem featured />
        &sdot;
        {navItems}
      </ul>
    </nav>
  );
};
