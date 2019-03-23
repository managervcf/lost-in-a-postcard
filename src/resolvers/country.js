// Import resolver guards.
import { isAuthenticated, isAuthorized } from '../utils';

// Create and immediately export default resolvers.
export default {
	Query: {
		countries: async (parent, args, { models }) =>
			await models.Country.find({}),
		country: async (parent, { name }, { models }) =>
			await models.Country.findOne({ name })
	},

	Mutation: {},

	Country: {
		photos: async ({ id }, args, { models }) =>
			await models.Photo.find({ country: id }),
		createdAt: ({ createdAt }) => createdAt.toString(),
		updatedAt: ({ updatedAt }) => updatedAt.toString()
	}
};
