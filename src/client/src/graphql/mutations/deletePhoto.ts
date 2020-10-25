import { gql } from 'apollo-boost';

export interface DeletePhotoData {
  deletePhoto: DeletePhotoVars;
}

export interface DeletePhotoVars {
  id: string;
}

export const DELETE_PHOTO = gql`
  mutation deletePhoto($id: ID!) {
    deletePhoto(id: $id) {
      id
    }
  }
`;
