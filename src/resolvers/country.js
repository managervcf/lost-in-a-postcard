export default {
	Query: {
		countries: async (parent, args, { services }) =>
			await services.getAllCountries(),
		country: async (parent, { name }, { services }) => {
			const allCountries = await services.getAllCountries();
			return allCountries.find(country => country.name === name);
		}
	}
};
