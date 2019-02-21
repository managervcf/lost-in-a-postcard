// Create and immediately export default resolvers.
export default {
	Query: {
		messages: async (parent, args, { models }) => await models.Message.find({}),
		message: async (parent, { id }, { models }) =>
			await models.Message.findById(id)
	},

	Mutation: {
		createMessage: async (parent, { text }, { models, me }) => {
			// Create new message document.
			const newMessage = new models.Message({
				text,
				user: me.id
			});
			// Use custom static method defined in models/user.js to associate
			// newly created message to user.
			await models.User.findByIdAndAddMessage(me.id, newMessage);
			// Save newly created message to database.
			await newMessage.save();
			return newMessage;
		},

		updateMessage: async (parent, { id, text }, { models }) =>
			await models.Message.findByIdAndUpdate(id, { text }),

		deleteMessage: async (parent, { id }, { models }) =>
			await models.Message.findByIdAndDelete(id)
	},

	Message: {
		user: async ({ user }, args, { models }) => await models.User.findById(user)
	}
};
