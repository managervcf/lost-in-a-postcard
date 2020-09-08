import gql from 'graphql-tag';

export const EDIT_PHOTO = gql`
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
