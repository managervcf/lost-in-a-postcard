import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    users: [User!]
    user(id: ID!): User
    loggedUser: User
    userByUsername(username: String!): User
  }

  extend type Mutation {
    signUp(username: String!, email: String!, password: String!): Token!
    updateUser(id: ID!, username: String, email: String): User!
    deleteUser(id: ID!): User
  }

  type Token {
    token: String!
  }

  type User {
    id: ID!
    username: String!
    email: String
    photos: [Photo!]!
    createdAt: String!
    updatedAt: String!
  }
`;
