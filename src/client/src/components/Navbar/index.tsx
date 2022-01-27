import { useQuery } from 'react-apollo';
import { COUNTRIES, CountriesData } from '../../graphql';
import { Grid, Tabs } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { NavbarItem } from './NavbarItem';
import { getRoutes } from '../../utils';
import { theme } from '../../constants';

export const Navbar: React.FC = () => {
  const { data: countriesData, loading, error } = useQuery<CountriesData>(COUNTRIES);

  const { pathname } = useLocation();

  // Handle error, loading and no data states.
  if (loading || error || !countriesData) {
    return null;
  }

  // Get routes.
  const routes = getRoutes(countriesData.countries);

  /**
   * Build the navbar items and sort them alphabetically.
   */
  const navItems = routes.map(({ label, value, id }, index) => (
    <NavbarItem key={id} label={label} value={value} index={index} />
  ));

  return (
    <Grid container justifyContent="center" mb={2} marginX={0}>
      <Tabs
        TabScrollButtonProps={{ style: { color: theme.palette.primary.main } }}
        value={pathname}
        variant="scrollable"
        scrollButtons="auto"
        allowScrollButtonsMobile
        indicatorColor="primary"
        textColor="primary"
      >
        {navItems}
      </Tabs>
    </Grid>
  );
};
