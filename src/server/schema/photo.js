// Import gql helper to construct GraphQL schema.
import { gql } from 'apollo-server-express';

// Define and export schema.
export const photoSchema = gql`
  extend type Query {
    photos(
      country: String
      featured: Boolean
      limit: Int
      page: Int
    ): PhotoConnection!
    photo(id: ID!): Photo!
  }

  extend type Mutation {
    addPhoto(
      country: String!
      caption: String
      featured: Boolean
      key: String!
      size: Int!
    ): Photo!
    updatePhoto(
      id: ID!
      country: String
      caption: String
      featured: Boolean
    ): Photo
    deletePhoto(id: ID!): Photo
    clickPhoto(id: ID!): Photo
  }

  type PhotoConnection {
    docs: [Photo!]!
    pageInfo: PageInfo!
  }

  type PageInfo {
    totalDocs: Int!
    limit: Int!
    page: Int!
    prevPage: Int
    nextPage: Int
    totalPages: Int!
    hasPrevPage: Boolean!
    hasNextPage: Boolean!
  }

  type Photo {
    id: ID!
    upload: UploadedFile!
    country: Country
    caption: String
    featured: Boolean
    clicks: Int!
    author: User!
    createdAt: String!
    updatedAt: String!
  }

  type UploadedFile {
    key: String!
    size: Int!
  }
`;
