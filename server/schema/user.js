// Import gql helper to construct GraphQL schema.
import { gql } from 'apollo-server-express';

// Define and export schema.
export const userSchema = gql`
  extend type Query {
    users: [User!]
    user(id: ID!): User
    userByLogin(login: String!): User
    me: User
  }

  extend type Mutation {
    signUp(
      username: String!
      email: String!
      password: String!
      role: String
    ): Token!
    logIn(login: String!, password: String!): Token!
    updateUser(username: String, email: String): User
    deleteUser: User!
  }

  type Token {
    token: String!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    role: String!
    photos: [Photo!]!
    createdAt: String!
    updatedAt: String!
  }
`;
