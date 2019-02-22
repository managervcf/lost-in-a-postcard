// Create and immediately export default resolvers.
export default {
	Query: {
		users: async (parent, args, { models }) => await models.User.find({}),
		user: async (parent, { id }, { models }) => await models.User.findById(id),
		userByUsername: async (parent, { username }, { models }) =>
			await models.User.findOne({ username }),
		loggedUser: (parent, args, { loggedUser }) => loggedUser
	},

	Mutation: {
		createUser: async (parent, args, { models }) =>
			await models.User.addUser(args),
		updateUser: async (parent, args, { models }) =>
			await models.User.findByIdAndUpdate(args.id, args, { new: true }),
		deleteUser: async (parent, { id }, { models }) =>
			await models.User.deleteUser(id)
	},

	User: {
		photos: async ({ id }, args, { models }) =>
			await models.Photo.find({ author: id })
	}
};
