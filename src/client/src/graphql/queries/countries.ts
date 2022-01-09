import { gql } from 'apollo-boost';

interface Country {
  id: string;
  name: string;
  description?: string;
  photos: {
    id: string;
  }[];
}

export interface CountriesData {
  countries: Country[];
}

export const COUNTRIES = gql`
  query countries {
    countries {
      id
      name
      description
      photos {
        id
      }
    }
  }
`;
