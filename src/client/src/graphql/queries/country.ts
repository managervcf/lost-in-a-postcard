import { gql } from 'apollo-boost';

export interface CountryData {
  country: {
    id: string;
    name: string;
    description?: string;
  };
}

export const COUNTRY = gql`
  query country($name: String!) {
    country(name: $name) {
      id
      name
      description
    }
  }
`;
