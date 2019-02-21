// Create and immediately export default resolvers.
export default {
	Query: {
		messages: async (parent, args, { models }) =>
			await models.Message.find({}),
		message: async (parent, { id }, { models }) =>
			await models.Message.findById(id)
	},

	Mutation: {
		createMessage: async (parent, { text }, { models, loggedUser }) =>
			await models.User.addMessage(loggedUser.id, text),

		updateMessage: async (parent, { id, text }, { models }) =>
			await models.Message.findByIdAndUpdate(id, { text }),

		deleteMessage: async (parent, { id }, { models }) =>
			await models.Message.findByIdAndDelete(id)
	},

	Message: {
		user: async ({ user }, args, { models }) => await models.User.findById(user)
	}
};
