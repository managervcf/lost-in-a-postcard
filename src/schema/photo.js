// Import gql helper to construct GraphQL schema.
import { gql } from 'apollo-server-express';

// Define and export default schema.
export default gql`
	extend type Query {
		photos(
			country: String
			featured: Boolean
			limit: Int
			page: Int
		): PhotoConnection!
		photo(id: ID!): Photo!
	}

	extend type Mutation {
		addPhoto(
			file: Upload!
			country: String!
			caption: String
			featured: Boolean
		): Photo!
		updatePhoto(
			id: ID!
			country: String
			caption: String
			featured: Boolean
		): Photo!
		deletePhoto(id: ID!): Photo!
		clickPhoto(id: ID!): Photo!
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
		upload: UploadedFile!
		country: String!
		caption: String
		featured: Boolean
		likes: Int!
		author: User!
		createdAt: String!
		updatedAt: String!
	}

	type UploadedFile {
		public_id: String!
		url: String!
	}
`;
