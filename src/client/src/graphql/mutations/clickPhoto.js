import { gql } from 'apollo-boost';

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
