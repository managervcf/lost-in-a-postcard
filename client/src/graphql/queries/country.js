import { gql } from 'apollo-boost';

export const COUNTRY = gql`
  query country($name: String!) {
    country(name: $name) {
      id
      name
      description
    }
  }
`;
