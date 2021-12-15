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
    totalDocs: number;
    limit: number;
    totalPages: number;
    page: number;
    pagingCounter: number;
    hasPrevPage: boolean;
    hasNextPage: boolean;
    prevPage?: number;
    nextPage?: number;
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
      totalDocs
      limit
      totalPages
      page
      hasPrevPage
      hasNextPage
      prevPage
      nextPage
    }
  }
`;
