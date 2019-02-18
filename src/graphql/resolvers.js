// Import axios
import axios from 'axios';
import uuidv4 from 'uuid/v4';

// Sample data to work with
let users = [
	{
		id: '1',
		username: 'Mateusz Pyzowski',
		messageIds: [1]
	},
	{
		id: '2',
		username: 'Dominika Pyzowska',
		messageIds: [2]
	}
];

let messages = [
	{
		id: '1',
		text: 'Hello World',
		userId: '1'
	},
	{
		id: '2',
		text: 'By World',
		userId: '2'
	}
];

// Country API url and fetch helper function to clean up resolvers
const countryUrl = 'https://restcountries.eu/rest/v2/all';
const fetchData = async url => (await axios.get(url)).data;

// Resolvers define the technique for fetching the types in the schema.
const resolvers = {
	Query: {
		users: () => users,
		user: (parent, { id }) => users.find(user => user.id === id),
		me: (parent, args, { me }) => me,

		messages: () => messages,
		message: (parent, { id }) => messages.find(message => message.id === id),

		countries: async () => await fetchData(countryUrl),
		country: async (parent, { name }) =>
			(await fetchData(countryUrl)).find(country => country.name === name)
	},

	Mutation: {
		createMessage: (parent, { text }, { me }) => {
			const newId = uuidv4();
			const newMessage = {
				id: newId,
				text,
				userId: me.id
			};
			messages = [...messages, newMessage];
			users.find(({ id }) => id === me.id).messageIds.push(newId);
			return newMessage;
		},

		updateMessage: (parent, { id, text }) => {
			if (messages.every(message => message.id !== id)) {
				return false;
			}
			messages = messages.map(message =>
				message.id === id ? { ...message, text } : message
			);
			return true;
		},

		deleteMessage: (parent, { id }) => {
			if (messages.every(message => message.id !== id)) {
				return false;
			}
			messages = messages.filter(({ id }) => id !== args.id);
			return true;
		}
	},

	User: {
		messages: ({ id }) => messages.filter(({ userId }) => userId === id)
	},

	Message: {
		user: ({ userId }) => users.find(({ id }) => id === userId)
	}
};

export default resolvers;
