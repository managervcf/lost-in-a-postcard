export default {
	Query: {
		countries: async (parent, args, { API }) =>
			await API.getAllCountries(),
		country: async (parent, { name }, { API }) => {
			const allCountries = await API.getAllCountries();
			return allCountries.find(country => country.name === name);
		}
	}
};
