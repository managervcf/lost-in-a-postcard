import { gql } from 'apollo-server-express';

export const uploadSchema = gql`
  extend type Mutation {
    getPresignedUrl(country: String!, type: String, size: Int): UploadConfig!
  }

  type UploadConfig {
    key: String!
    url: String!
  }
`;
