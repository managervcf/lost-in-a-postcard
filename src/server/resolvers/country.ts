import { isAuthorized } from '../utils';
import { Resolvers, UpdateCountryArgs, CountryDoc } from '../types';

// Create and immediately export resolvers.
export const countryResolvers: Resolvers<CountryDoc> = {
  Query: {
    countries: async (parent, args, { models }) =>
      await models.Country.find({}),
    country: async (parent, { name }: { name: string }, { models }) =>
      await models.Country.findOne({ name }),
  },

  Mutation: {
    updateCountry: isAuthorized(
      async (parent, args: UpdateCountryArgs, { models }) =>
        await models.Country.updateCountry(args)
    ),
  },

  Country: {
    photos: async ({ id }, args, { models }) =>
      await models.Photo.find({ country: id }),
    createdAt: ({ createdAt }, args, context) => createdAt.toString(),
    updatedAt: ({ updatedAt }, args, context) => updatedAt.toString(),
  },
};
