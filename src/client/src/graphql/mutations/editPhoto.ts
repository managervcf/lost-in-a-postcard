import { gql } from 'apollo-boost';

export interface UpdatePhotoData {
  updatePhoto: {
    id: string;
    country: {
      name: string;
    };
  };
}

export interface UpdatePhotoVars {
  id: string;
  country?: string;
  caption?: string;
  featured: boolean;
}

export const UPDATE_PHOTO = gql`
  mutation updatePhoto(
    $id: ID!
    $country: String
    $caption: String
    $featured: Boolean
  ) {
    updatePhoto(
      id: $id
      country: $country
      caption: $caption
      featured: $featured
    ) {
      id
      country {
        name
      }
    }
  }
`;
