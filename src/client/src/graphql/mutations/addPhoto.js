import { gql } from 'apollo-boost';

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
