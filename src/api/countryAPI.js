// Import axios to perform API calls.
import axios from 'axios';

// Define function that fetches all data from country API.
const countryUrl = 'https://restcountries.eu/rest/v2/all';
const getAllCountries = async () => (await axios.get(countryUrl)).data;

export default getAllCountries;
