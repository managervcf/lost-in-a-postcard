// Import resolver guards.
import { isAuthorized } from '../utils';

// Create and immediately export default resolvers.
export const countryResolvers = {
  Query: {
    countries: async (parent, args, { models }) =>
      await models.Country.find({}).cache(),
    country: async (parent, { name }, { models }) =>
      await models.Country.findOne({ name }).cache(),
  },

  Mutation: {
    updateCountry: isAuthorized(
      async (parent, { id, ...args }, { models }) =>
        await models.Country.findByIdAndUpdate(id, { ...args }, { new: true })
    ),
  },

  Country: {
    photos: async ({ id }, args, { models }) =>
      await models.Photo.find({ country: id }),
    createdAt: ({ createdAt }, args, context) => createdAt.toString(),
    updatedAt: ({ updatedAt }, args, context) => updatedAt.toString(),
  },
};
