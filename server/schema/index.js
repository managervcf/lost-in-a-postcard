// Import gql helper to construct GraphQL schema.
import { gql } from 'apollo-server-express';

// Import every part of schema.
import { userSchema } from './user';
import { photoSchema } from './photo';
import { countrySchema } from './country';
import { uploadSchema } from './upload';

// Define linkSchema that bonds all schemas together.
const linkSchema = gql`
  type Query {
    _: Boolean
  }

  type Mutation {
    _: Boolean
  }

  type Subscription {
    _: Boolean
  }
`;

// Export all schemas as an array.
export const typeDefs = [
  linkSchema,
  userSchema,
  photoSchema,
  countrySchema,
  uploadSchema,
];
