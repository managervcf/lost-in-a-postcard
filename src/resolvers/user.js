export default {
	Query: {
		users: (parent, args, { models }) => models.users,
		user: (parent, { id }, { models }) =>
			models.users.find(user => user.id === id),
		me: (parent, args, { me }) => me
	},

	User: {
		messages: ({ id }, args, { models }) =>
			models.messages.filter(({ userId }) => userId === id)
	}
};
