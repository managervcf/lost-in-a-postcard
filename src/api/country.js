// Import axios to perform API calls.
import axios from 'axios';

// Define function that fetches all data from country API.
const countryUrl = 'https://restcountries.eu/rest/v2/all';

// Define helper functions to perform API calls.
const getAllCountries = async () => (await axios.get(countryUrl)).data;

const getCountryByName = async name => {
	const allCountries = await getAllCountries();
	return allCountries.find(country => country.name === name);
};

export default { getAllCountries, getCountryByName };
