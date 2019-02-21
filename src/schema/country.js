import { gql } from 'apollo-server-express';

export default gql`
	extend type Query {
		countries: [Country!]
		country(name: String!): Country
	}

	type Country {
		name: String!
		nativeName: String!
		region: String!
		population: Int
		area: Float
	}
`;
