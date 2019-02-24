// Import gql helper to construct GraphQL schema.
import { gql } from 'apollo-server-express';

// Define and export default schema.
export default gql`
  extend type Query {
    users: [User!]
    user(id: ID!): User
    currentUser: User
    userByUsername(username: String!): User
  }

  extend type Mutation {
    signup(username: String!, email: String!, password: String!): User!
    login(login: String!, password: String!): User!
    updateUser(id: ID!, username: String, email: String): User!
    deleteUser(id: ID!): User
  }

  type Token {
    token: String!
  }

  type User {
    id: ID!
    username: String!
    email: String!
    photos: [Photo!]!
    createdAt: String!
    updatedAt: String!
  }
`;
