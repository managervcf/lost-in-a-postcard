import gql from 'graphql-tag';

export const ADD_PHOTO = gql`
  mutation addPhoto(
    $file: Upload!
    $country: String!
    $caption: String
    $featured: Boolean
    $key: String!
  ) {
    addPhoto(
      file: $file
      country: $country
      caption: $caption
      featured: $featured
      key: $key
    ) {
      id
      country {
        name
        description
      }
      upload {
        url
        key
      }
    }
  }
`;
