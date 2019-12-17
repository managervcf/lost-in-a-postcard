import gql from 'graphql-tag';

export default gql`
  mutation updateCountry($id: ID!, $name: String!, $description: String) {
    updateCountry(id: $id, name: $name, description: $description) {
      id
      name
      description
    }
  }
`;
