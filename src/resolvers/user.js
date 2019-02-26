// Import resolver guards.
import { authenticated } from '../helpers';

// Create and immediately export default resolvers.
export default {
	Query: {
		users: async (parent, args, { models }) => await models.User.find({}),
		user: async (parent, { id }, { models }) => await models.User.findById(id),
		userByUsername: async (parent, { username }, { models }) =>
			await models.User.findOne({ username }),
		// Wrap resolver with authenticate middleware to check if user is logged in.
		me: authenticated((parent, args, { me }) => me)
	},

	Mutation: {
		signUp: async (parent, args, { models }) => await models.User.signUp(args),
		logIn: async (parent, { login, password }, { models }) =>
			await models.User.logIn(login, password),
		updateUser: authenticated(
			async (parent, args, { models, me }) =>
				await models.User.findByIdAndUpdate(me.id, args, { new: true })
		),
		deleteUser: authenticated(
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
