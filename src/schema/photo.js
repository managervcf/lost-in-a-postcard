// Import gql helper to construct GraphQL schema.
import { gql } from 'apollo-server-express';

// Define and export default schema.
export default gql`
	extend type Query {
		photos(country: String, limit: Int, page: Int): PhotoConnection!
		photo(id: ID!): Photo!
	}

	extend type Mutation {
		createPhoto(url: String!, country: String, caption: String): Photo!
		updatePhoto(id: ID!, url: String, country: String, caption: String): Photo!
		deletePhoto(id: ID!): Photo!
	}

	type PhotoConnection {
		docs: [Photo!]!
		pageInfo: PageInfo!
	}

	type PageInfo {
		total: Int!
		limit: Int!
		page: Int!
		pages: Int!
		hasNextPage: Boolean!
	}

	type Photo {
		id: ID!
		url: String!
		country: String!
		caption: String
		author: User!
		createdAt: String!
		updatedAt: String!
	}
`;
