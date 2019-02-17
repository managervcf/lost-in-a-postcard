// Import axios
import axios from 'axios';

// Sample data to work with
let users = {
	1: {
		id: '1',
		username: 'Mateusz Pyzowski'
	},
	2: {
		id: '2',
		username: 'Dominika Pyzowska'
	}
};

// Country API
const url = 'https://restcountries.eu/rest/v2/all';

// Resolvers define the technique for fetching the types in the schema.
const resolvers = {
	Query: {
		users: () => Object.values(users),
		user: (parent, { id }) => users[id],
		me: (parent, args, { me }) => me,
		countries: async () => (await axios.get(url)).data,
		country: async (parent, args) =>
			(await axios.get(url)).data.find(({ name }) => args.name === name)
	},

	User: {
		description: ({ username, id }) => `${username} has an ID: ${id}`
	},

	Country: {
		// name: ({ name }) => name,
		// population: ({ population }) => population
	}
};

export default resolvers;
