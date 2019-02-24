// Create and immediately export default resolvers.
export default {
	Query: {
		countries: async (parent, args, { services }) =>
			await services.country.getAllCountries(),
		country: async (parent, { name }, { services }) =>
			await services.country.getCountryByName(name)
	}
};
