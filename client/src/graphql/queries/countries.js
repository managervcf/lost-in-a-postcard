import { gql } from 'apollo-boost';

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
