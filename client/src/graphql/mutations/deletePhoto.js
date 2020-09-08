import gql from 'graphql-tag';

export const DELETE_PHOTO = gql`
  mutation deletePhoto($id: ID!) {
    deletePhoto(id: $id) {
      id
      country {
        name
      }
    }
  }
`;
