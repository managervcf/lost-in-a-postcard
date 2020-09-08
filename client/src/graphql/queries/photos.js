import gql from 'graphql-tag';

export const PHOTOS = gql`
  query photos($country: String, $featured: Boolean, $limit: Int, $page: Int) {
    photos(country: $country, featured: $featured, limit: $limit, page: $page) {
      docs {
        id
        country {
          name
          description
        }
        caption
        featured
        clicks
        upload {
          url
        }
        author {
          username
        }
      }
    }
  }
`;
