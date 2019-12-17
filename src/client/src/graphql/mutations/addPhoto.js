import gql from 'graphql-tag';

export default gql`
  mutation addPhoto(
    $file: Upload!
    $country: String!
    $caption: String
    $featured: Boolean
  ) {
    addPhoto(
      file: $file
      country: $country
      caption: $caption
      featured: $featured
    ) {
      id
      country {
        name
        description
      }
      upload {
        url
      }
    }
  }
`;
