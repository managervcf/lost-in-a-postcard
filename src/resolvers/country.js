// Create and immediately export default resolvers.
export default {
	Query: {
		countries: async (parent, args, { api }) =>
			await api.country.getAllCountries(),
		country: async (parent, { name }, { api }) =>
			await api.country.getCountryByName(name)
	}
};
