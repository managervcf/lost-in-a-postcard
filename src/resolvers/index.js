import userResolvers from './user';
import messageResolvers from './message';
import countryResolvers from './country';

export default [userResolvers, messageResolvers, countryResolvers];

// // Import axios
// import axios from 'axios';

// // Resolvers define the technique for fetching the types in the schema.
// const resolvers = {
// 	Query: {
// 		users: (parent, args, { models }) => models.users,
// 		user: (parent, { id }, { models }) =>
// 			models.users.find(user => user.id === id),
// 		me: (parent, args, { me }) => me,

// 		messages: (parent, args, { models }) => models.messages,
// 		message: (parent, { id }, { models }) =>
// 			models.messages.find(message => message.id === id),

// 		countries: async () => await fetchData(countryUrl),
// 		country: async (parent, { name }) =>
// 			(await fetchData(countryUrl)).find(country => country.name === name)
// 	},

// 	Mutation: {
// 		createMessage: (parent, { text }, { models, me }) => {
// 			const newId = uuidv4();
// 			const newMessage = {
// 				id: newId,
// 				text,
// 				userId: me.id
// 			};
// 			models.messages = [...models.messages, newMessage];
// 			models.users.find(({ id }) => id === me.id).messageIds.push(newId);
// 			return newMessage;
// 		},

// 		updateMessage: (parent, { id, text }, { models }) => {
// 			if (models.messages.every(message => message.id !== id)) {
// 				return false;
// 			}
// 			models.messages = models.messages.map(message =>
// 				message.id === id ? { ...message, text } : message
// 			);
// 			return true;
// 		},

// 		deleteMessage: (parent, { id }, { models }) => {
// 			if (models.messages.every(message => message.id !== id)) {
// 				return false;
// 			}
// 			models.messages = models.messages.filter(({ id }) => id !== args.id);
// 			return true;
// 		}
// 	},

// 	User: {
// 		messages: ({ id }, args, { models }) =>
// 			models.messages.filter(({ userId }) => userId === id)
// 	},

// 	Message: {
// 		user: ({ userId }, args, { models }) =>
// 			models.users.find(({ id }) => id === userId)
// 	}
// };

// export default resolvers;
