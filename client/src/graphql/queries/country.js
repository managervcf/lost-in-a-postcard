import gql from 'graphql-tag';

export default gql`
  query country($name: String!) {
    country(name: $name) {
      id
      name
      description
    }
  }
`;
