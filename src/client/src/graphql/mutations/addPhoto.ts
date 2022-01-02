import { gql } from 'apollo-boost';

export interface AddPhotoData {
  addPhoto: {
    id: string;
    region: string;
    caption: string;
    country: {
      name: string;
      description?: string;
    };
    upload: {
      key: string;
      size: number;
    };
  };
}
export interface AddPhotoVars {
  country: string;
  region: string;
  caption?: string;
  featured?: boolean;
  key: string;
  size: number;
}

export const ADD_PHOTO = gql`
  mutation addPhoto(
    $country: String!
    $region: String
    $caption: String
    $featured: Boolean
    $key: String!
    $size: Int!
  ) {
    addPhoto(
      country: $country
      region: $region
      caption: $caption
      featured: $featured
      key: $key
      size: $size
    ) {
      id
      region
      caption
      country {
        name
        description
      }
      upload {
        key
        size
      }
    }
  }
`;
