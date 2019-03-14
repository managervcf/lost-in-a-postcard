// Import resolver guards.
import { isAuthenticated } from '../helpers';

// Create and immediately export default resolvers.
export default {
	Query: {
		users: async (parent, args, { models }) => await models.User.find({}),
		user: async (parent, { id }, { models }) => await models.User.findById(id),
		userByLogin: async (parent, { login }, { models }) =>
			await models.User.findByLogin({ login }),
		// Wrap resolver with authenticate middleware to check if user is logged in.
		me: isAuthenticated(
			async (parent, args, { models, me }) => await models.User.findById(me.id)
		)
	},

	Mutation: {
		signUp: async (parent, args, { models }) => await models.User.signUp(args),
		logIn: async (parent, args, { models }) => await models.User.logIn(args),
		updateUser: isAuthenticated(
			async (parent, args, { models, me }) =>
				await models.User.findByIdAndUpdate(me.id, args, { new: true })
		),
		deleteUser: isAuthenticated(
			async (parent, args, { models, me }) =>
				await models.User.deleteUser(me.id)
		)
	},

	User: {
		photos: async ({ id }, args, { models }) =>
			await models.Photo.find({ author: id }),
		createdAt: ({ createdAt }) => createdAt.toString(),
		updatedAt: ({ updatedAt }) => updatedAt.toString()
	}
};
