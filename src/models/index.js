// Import axios for http requests
import axios from 'axios';

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

// Data from Country API
const countryUrl = 'https://restcountries.eu/rest/v2/all';
const getAllCountries = async () => (await axios.get(countryUrl)).data;

export default { users, messages, getAllCountries };
