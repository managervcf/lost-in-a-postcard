import { gql } from 'apollo-server-express';

export default gql`
  extend type Query {
    users: [User!]
    user(id: ID!): User
    me: User
  }

  extend type Mutation {
    createUser(username: String!): User!
    deleteUser(id: ID!): User
  }

  type User {
    id: ID!
    username: String!
    email: String
    messages: [Message!]!
  }
`;
