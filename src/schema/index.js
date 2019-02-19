// Import gql helper to construct GraphQL schema
import { gql } from 'apollo-server-express';

import userSchema from './user';
import messageSchema from './message';
import countrySchema from './country';

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

export default [
	linkSchema,
	userSchema,
	messageSchema,
	countrySchema
];
