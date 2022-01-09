import { useQuery } from 'react-apollo';
import { NavbarItem } from './NavbarItem';
import { COUNTRIES, CountriesData, ME, MeData } from '../../graphql';

export const Navbar: React.FC = () => {
  const { data: countriesData, loading, error } = useQuery<CountriesData>(COUNTRIES);
  console.log({ countriesData });

  const { data } = useQuery<MeData>(ME, { fetchPolicy: 'network-only' });

  // Handle error, loading and no data states.
  if (loading || error || !countriesData) {
    return null;
  }

  /**
   * Build the navbar items and sort them alphabetically.
   */
  const navItems = countriesData.countries
    .sort((a, b) => a.name.localeCompare(b.name))
    .map(({ id, name, photos }) => (
      <NavbarItem key={id} countryName={name} amount={photos.length} user={data?.me} />
    ));

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
