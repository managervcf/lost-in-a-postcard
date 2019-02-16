// Import gql helper to construct GraphQL schema
const { gql } = require('apollo-server-express');

// Type definitions define the "shape" of your data and specify
// which ways the data can be fetched from the GraphQL server.
const typeDefs = gql`
	type Book {
		title: String
		author: String
	}

	type Query {
		books: [Book]
	}
`;

module.exports = typeDefs;
