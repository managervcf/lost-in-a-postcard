import gql from 'graphql-tag';

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
