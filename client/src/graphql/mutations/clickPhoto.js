import gql from 'graphql-tag';

export default gql`
  mutation clickPhoto($id: ID!) {
    clickPhoto(id: $id) {
      id
      country {
        name
      }
    }
  }
`;
