// Import resolver guards.
import { isAuthenticated, isAuthorized } from '../utils';

// Create and immediately export default resolvers.
export const photoResolvers = {
  Query: {
    photos: async (parent, args, { models }) =>
      await models.Photo.findPhotos(args),
    photo: async (parent, { id }, { models }) =>
      await models.Photo.findById(id),
  },

  Mutation: {
    addPhoto: isAuthenticated(
      async (parent, args, { models, me }) =>
        await models.Photo.addPhoto(me, args)
    ),
    updatePhoto: isAuthorized(
      async (parent, args, { models }) =>
        await models.Photo.findByIdAndUpdate(args.id, args, { new: true })
    ),
    deletePhoto: isAuthorized(
      async (parent, { id }, { models }) => await models.Photo.deletePhoto(id)
    ),
    clickPhoto: async (parent, { id }, { models }) =>
      await models.Photo.clickPhoto(id),
  },

  Photo: {
    country: async ({ country }, args, { models }) =>
      await models.Country.findById(country),
    author: async ({ author }, args, { models }) =>
      await models.User.findById(author),
    createdAt: ({ createdAt }, args, context) => createdAt.toString(),
    updatedAt: ({ updatedAt }, args, context) => updatedAt.toString(),
  },
};
