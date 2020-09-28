import { gql } from 'apollo-server-express';

export const uploadSchema = gql`
  extend type Mutation {
    getPresignedUrl: UploadConfig!
  }

  type UploadConfig {
    key: String!
    url: String!
  }
`;
