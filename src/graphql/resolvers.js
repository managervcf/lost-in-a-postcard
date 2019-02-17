// Import axios
import axios from 'axios';

// Sample data to work with
let users = {
	1: {
		id: '1',
		username: 'Mateusz Pyzowski',
		messageIds: [1]
	},
	2: {
		id: '2',
		username: 'Dominika Pyzowska',
		messageIds: [2]
	}
};

let messages = {
	1: {
		id: '1',
		text: 'Hello World',
		userId: '1'
	},
	2: {
		id: '2',
		text: 'By World',
		userId: '2'
	}
};

// Country API url
const url = 'https://restcountries.eu/rest/v2/all';

// Resolvers define the technique for fetching the types in the schema.
const resolvers = {
	Query: {
		users: () => Object.values(users),
		user: (parent, { id }) => users[id],
		me: (parent, args, { me }) => me,

		messages: () => Object.values(messages),
		message: (parent, { id }) => messages[id],

		countries: async () => (await axios.get(url)).data,
		country: async (parent, args) =>
			(await axios.get(url)).data.find(country => args.name === country.name)
	},

	User: {
		messages: parent =>
			Object.values(messages).filter(({ userId }) => userId === parent.id)
	},

	Message: {
		user: parent => users[parent.userId]
	}
};

export default resolvers;
