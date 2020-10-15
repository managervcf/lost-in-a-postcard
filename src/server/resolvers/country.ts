import { CountryResolvers } from '../types';
// Import resolver guards.
import { isAuthorized } from '../utils';

// Create and immediately export default resolvers.
export const countryResolvers: CountryResolvers = {
  Query: {
    countries: async (parent, args, { models }) =>
      await models.Country.find({}),
    country: async (parent, { name }, { models }) =>
      await models.Country.findOne({ name }),
  },

  Mutation: {
    updateCountry: isAuthorized((parent, args, { models }) =>
      models.Country.updateCountry(args)
    ),
  },

  Country: {
    photos: async ({ id }, args, { models }) =>
      await models.Photo.find({ country: id }),
    createdAt: ({ createdAt }, args, context) => createdAt.toString(),
    updatedAt: ({ updatedAt }, args, context) => updatedAt.toString(),
  },
};
