// Import gql helper to construct GraphQL schema.
import { gql } from 'apollo-server-express';

// Import every part of schema.
import userSchema from './user';
import photoSchema from './photo';
import countrySchema from './country';

// Define linkSchema that bonds all schemas together.
const linkSchema = gql`
	type Query {
		_: Boolean
	}

	type Mutation {
		_: Boolean
	}

	type Subscription {
		_: Boolean
	}
`;

// Export all schemas as an array.
export default [
	linkSchema,
	userSchema,
	photoSchema,
	countrySchema
];
