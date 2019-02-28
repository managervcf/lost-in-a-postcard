// Import gql helper to construct GraphQL schema.
import { gql } from 'apollo-server-express';

// Define and export default schema.
export default gql`
	extend type Query {
		countries(search: String): [Country!]
		country(name: String!): Country
	}

	type Country {
		name: String!
		nativeName: String!
		region: String!
		population: Int
		area: Float
		flag: String
	}
`;
