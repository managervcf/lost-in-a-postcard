import { gql } from 'apollo-boost';

export const UPDATE_COUNTRY = gql`
  mutation updateCountry($id: ID!, $name: String!, $description: String) {
    updateCountry(id: $id, name: $name, description: $description) {
      id
      name
      description
    }
  }
`;
