export default {
	Query: {
		countries: async (parent, args, { models }) =>
			await models.getAllCountries(),
		country: async (parent, { name }, { models }) => {
			const allCountries = await models.getAllCountries();
			return allCountries.find(country => country.name === name);
		}
	}
};
