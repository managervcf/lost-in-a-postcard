// Import axios to perform API calls.
import axios from 'axios';

// Import searchung helper function.
import { doesContain } from '../helpers';

// Define API url.
const countryUrl = 'https://restcountries.eu/rest/v2/all';

// Define helper functions to perform API calls and filtering logic.
const getCountries = async ({ search = '' }) => {
	// Get all countries from API.
	let allCountries = (await axios.get(countryUrl)).data;
	// Filter countries by search text using a helper.
	let foundCountries = allCountries.filter(({ name, nativeName, region }) =>
		doesContain(search, name, nativeName, region)
	);
	// Return filtered countries.
	console.log(
		`(GraphQL) Found ${
			foundCountries.length
		} countries meeting '${search}' criteria.`
	);
	return foundCountries;
};

const getCountryByName = async ({ name }) => {
	let allCountries = (await axios.get(countryUrl)).data;
	let foundCountry = allCountries.find(
		country => country.name.toLowerCase() === name.trim().toLowerCase()
	);
	// Return found country.
	console.log(
		`(GraphQL) Country '${name}' has${foundCountry ? '' : ' not'} been found.`
	);
	return foundCountry;
};

export default { getCountries, getCountryByName };
