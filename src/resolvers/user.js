// Create and immediately export default resolvers.
export default {
	Query: {
		users: async (parent, args, { models }) => await models.User.find({}),
		user: async (parent, { id }, { models }) => await models.User.findById(id),
		me: (parent, args, { me }) => me
	},

	Mutation: {
		createUser: async (parent, { username }, { models }) => {
			// Create new User model.
			const newUser = new models.User({ username });
			// Save new User to the database and return it.
			return await newUser.save();
		},

		deleteUser: async (parent, { id }, { models }) =>
			await models.User.findByIdAndDelete(id)
	},

	User: {
		messages: async ({ id }, args, { models }) =>
			await models.Message.find({ user: id })
	}
};
