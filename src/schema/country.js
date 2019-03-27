// Import gql helper to construct GraphQL schema.
import { gql } from 'apollo-server-express';

// Define and export default schema.
export default gql`
	extend type Query {
		countries: [Country!]
		country(name: String!): Country
	}

	extend type Mutation {
		updateCountry(id: ID!, name: String!, description: String): Country
	}

	type Country {
		id: ID!
		name: String!
		description: String
		photos: [Photo!]
		createdAt: String!
		updatedAt: String!
	}
`;
