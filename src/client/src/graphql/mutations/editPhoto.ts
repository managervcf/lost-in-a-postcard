import { gql } from 'apollo-boost';

export interface UpdatePhotoData {
  updatePhoto: {
    id: string;
    region: string;
    caption: string;
    featured: boolean;
    clicks: number;
    country: {
      name: string;
    };
  };
}

export interface UpdatePhotoVars {
  id: string;
  country?: string;
  region?: string;
  caption?: string;
  featured: boolean;
}

export const UPDATE_PHOTO = gql`
  mutation updatePhoto(
    $id: ID!
    $country: String
    $region: String
    $caption: String
    $featured: Boolean
  ) {
    updatePhoto(
      id: $id
      country: $country
      region: $region
      caption: $caption
      featured: $featured
    ) {
      id
      region
      caption
      featured
      clicks
      country {
        name
      }
    }
  }
`;
