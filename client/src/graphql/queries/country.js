import gql from 'graphql-tag';

export const COUNTRY = gql`
  query country($name: String!) {
    country(name: $name) {
      id
      name
      description
    }
  }
`;
