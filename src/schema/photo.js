import { gql } from 'apollo-server-express';

export default gql`
	extend type Query {
		photos: [Photo!]!
		photo(id: ID!): Photo!
		photoByCountry(country: String!): [Photo!]
	}

	extend type Mutation {
		createPhoto(url: String!, country: String, caption: String): Photo!
		updatePhoto(id: ID!, url: String, country: String, caption: String): Photo!
		deletePhoto(id: ID!): Photo!
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
