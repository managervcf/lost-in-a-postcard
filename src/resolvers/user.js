// Create and immediately export default resolvers.
export default {
	Query: {
		users: async (parent, args, { models }) => await models.User.find({}),
		user: async (parent, { id }, { models }) => await models.User.findById(id),
		me: (parent, args, { loggedUser }) => loggedUser
	},

	Mutation: {
		createUser: async (parent, args, { models }) =>
			await models.User.addUser(args),

		deleteUser: async (parent, { id }, { models }) =>
			await models.User.findByIdAndDelete(id)
	},

	User: {
		messages: async ({ id }, args, { models }) =>
			await models.Message.find({ user: id })
	}
};
