import gql from 'graphql-tag';

export default gql`
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
