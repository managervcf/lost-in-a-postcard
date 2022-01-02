// Import gql helper to construct GraphQL schema.
import { gql } from 'apollo-server-express';

// Define and export schema.
export const photoSchema = gql`
  extend type Query {
    photo(id: ID!): Photo!
    photos(country: String, featured: Boolean, limit: Int, page: Int): PhotoConnection!
  }

  extend type Mutation {
    addPhoto(
      country: String!
      region: String
      caption: String
      featured: Boolean
      key: String!
      size: Int!
    ): Photo!
    updatePhoto(
      id: ID!
      region: String
      country: String
      caption: String
      featured: Boolean
    ): Photo!
    deletePhoto(id: ID!): Photo!
    clickPhoto(id: ID!): Photo!
  }

  type PhotoConnection {
    docs: [Photo!]!
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
    country: Country!
    region: String!
    caption: String!
    featured: Boolean!
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
