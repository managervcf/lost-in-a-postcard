// Import gql helper to construct GraphQL schema.
import { gql } from 'apollo-server-express';

// Import every part of schema.
import { userSchema } from './user.schema';
import { photoSchema } from './photo.schema';
import { countrySchema } from './country.schema';
import { uploadSchema } from './upload.schema';

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
