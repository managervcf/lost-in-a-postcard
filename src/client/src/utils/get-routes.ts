import { CountriesData } from '../graphql';

interface Routes {
  value: string;
  label: string;
  id: string;
}

export const getRoutes = (countries: CountriesData['countries']): Routes[] => [
  {
    value: '/photos/all',
    label: 'All',
    id: '0',
  },
  {
    value: '/photos/all/featured',
    label: 'Best',
    id: '2',
  },
  ...countries
    .sort((a, b) => a.name.localeCompare(b.name))
    .map(({ id, name }) => ({
      value: `/photos/${name.replaceAll(' ', '-').toLowerCase()}`,
      label: name,
      id,
    })),
];
