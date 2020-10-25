import { gql } from 'apollo-boost';

export interface AddPhotoData {
  addPhoto: {
    id: string;
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
  caption?: string;
  featured?: boolean;
  key: string;
  size: number;
}

export const ADD_PHOTO = gql`
  mutation addPhoto(
    $country: String!
    $caption: String
    $featured: Boolean
    $key: String!
    $size: Int!
  ) {
    addPhoto(
      country: $country
      caption: $caption
      featured: $featured
      key: $key
      size: $size
    ) {
      id
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
