// Library to create unique ids
import uuidv4 from 'uuid/v4';

export default {
	Query: {
		messages: (parent, args, { models }) => models.messages,
		message: (parent, { id }, { models }) =>
			models.messages.find(message => message.id === id)
	},

	Mutation: {
		createMessage: (parent, { text }, { models, me }) => {
			const newId = uuidv4();
			const newMessage = {
				id: newId,
				text,
				userId: me.id
			};
			const { messages } = models;
			models.messages = [...messages, newMessage];
			models.users.find(({ id }) => id === me.id).messageIds.push(newId);
			return newMessage;
		},

		updateMessage: (parent, { id, text }, { models }) => {
			if (models.messages.every(message => message.id !== id)) {
				return false;
			}
			models.messages = models.messages.map(message =>
				message.id === id ? { ...message, text } : message
			);
			return true;
		},

		deleteMessage: (parent, { id }, { models }) => {
			if (models.messages.every(message => message.id !== id)) {
				return false;
			}
			models.messages = models.messages.filter(message => message.id !== id);
			return true;
		}
	},

	Message: {
		user: ({ userId }, args, { models }) =>
			models.users.find(({ id }) => id === userId)
	}
};
