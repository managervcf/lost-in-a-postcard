// Create and immediately export default resolvers.
export default {
	Query: {
		countries: async (parent, args, { api }) =>
			await api.country.getCountries(args),
		country: async (parent, args, { api }) =>
			await api.country.getCountryByName(args)
	}
};
