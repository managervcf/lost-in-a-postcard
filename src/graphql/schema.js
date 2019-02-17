// Import gql helper to construct GraphQL schema
import { gql } from 'apollo-server-express';

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
	type Query {
		users: [User!]
		user(id: ID!): User 
		me: User

		countries: [Country!]
		country(name: String!): Country
	}

	type User {
		id: ID!
		username: String!
		description: String!
	}

	type Country {
		name: String!
		nativeName: String!
		population: Int!
	}
`;

export default typeDefs;
