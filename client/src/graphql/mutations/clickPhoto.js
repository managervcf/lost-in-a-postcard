import gql from 'graphql-tag';

export const CLICK_PHOTO = gql`
  mutation clickPhoto($id: ID!) {
    clickPhoto(id: $id) {
      id
      country {
        name
      }
    }
  }
`;
