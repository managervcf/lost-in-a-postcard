import gql from 'graphql-tag';

export const UPDATE_COUNTRY = gql`
  mutation updateCountry($id: ID!, $name: String!, $description: String) {
    updateCountry(id: $id, name: $name, description: $description) {
      id
      name
      description
    }
  }
`;
