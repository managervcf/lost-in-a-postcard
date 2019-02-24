// Import resolver guards from middleware.
import { authenticate } from '../middleware';

// Create and immediately export default resolvers.
export default {
	Query: {
		users: async (parent, args, { models }) => await models.User.find({}),
		user: async (parent, { id }, { models }) => await models.User.findById(id),
		userByUsername: async (parent, { username }, { models }) =>
			await models.User.findOne({ username }),
		// Wrap resolver with authenticate middleware to check if user is logged in.
		currentUser: authenticate((parent, args, { currentUser }) => currentUser)
	},

	Mutation: {
		signup: async (parent, args, { models }) => await models.User.signup(args),
		login: async (parent, { login, password }, { models }) =>
			await models.User.login(login, password),
		updateUser: async (parent, args, { models }) =>
			await models.User.findByIdAndUpdate(args.id, args, { new: true }),
		deleteUser: async (parent, { id }, { models }) =>
			await models.User.deleteUser(id)
	},

	User: {
		photos: async ({ id }, args, { models }) =>
			await models.Photo.find({ author: id }),
		createdAt: ({ createdAt }) => createdAt.toString(),
		updatedAt: ({ updatedAt }) => updatedAt.toString()
	}
};
