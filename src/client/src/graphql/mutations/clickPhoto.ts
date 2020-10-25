import { gql } from 'apollo-boost';

export interface ClickPhotoData {
  clickPhoto: ClickPhotoVars;
}

export interface ClickPhotoVars {
  id: string;
}

export const CLICK_PHOTO = gql`
  mutation clickPhoto($id: ID!) {
    clickPhoto(id: $id) {
      id
    }
  }
`;
