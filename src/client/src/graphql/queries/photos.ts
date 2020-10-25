import { gql } from 'apollo-boost';

interface Photo {
  id: string;
  country: {
    name: string;
    description?: string;
  };
  caption: string;
  featured: boolean;
  clicks: number;
  upload: {
    key: string;
    size: number;
  };
  author: {
    username: string;
  };
}

export interface PhotosData {
  photos: {
    docs: Photo[];
    pageInfo?: {
      hasNextPage: boolean;
      nextPage?: number;
    };
  };
}

export interface PhotosVars {
  country?: string;
  featured?: boolean;
  limit?: number;
  page?: number;
}

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
          key
          size
        }
        author {
          username
        }
      }
      pageInfo {
        hasNextPage
        nextPage
      }
    }
  }
`;
