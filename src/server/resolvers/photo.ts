import { Types } from 'mongoose';
// Import resolver guards.
import { isAuthenticated, isAuthorized } from '../utils';
import {
  AddPhotoArgs,
  FindPhotosArgs,
  PhotoDoc,
  PhotoResolvers,
} from '../types';

// Create and immediately export default resolvers.
export const photoResolvers: PhotoResolvers = {
  Query: {
    photos: async (parent, args: FindPhotosArgs, { models }) =>
      await models.Photo.findPhotos(args),
    photo: async (parent, { id }, { models }) =>
      await models.Photo.findById(id),
  },

  Mutation: {
    addPhoto: isAuthenticated(
      async (parent, args: AddPhotoArgs, { models, me }) =>
        await models.Photo.addPhoto(me, args)
    ),
    updatePhoto: isAuthorized(
      async (parent, args, { models }) =>
        await models.Photo.findByIdAndUpdate(args.id, args, { new: true })
    ),
    deletePhoto: isAuthorized(
      async (parent, { id }, { models }) => await models.Photo.deletePhoto(id)
    ),
    clickPhoto: async (parent, { id }: { id: Types.ObjectId }, { models }) =>
      await models.Photo.clickPhoto(id),
  },

  Photo: {
    country: async ({ country }: PhotoDoc, args, { models }) =>
      await models.Country.findById(country),
    author: async ({ author }: PhotoDoc, args, { models }) =>
      await models.User.findById(author),
    createdAt: ({ createdAt }: PhotoDoc, args, context) => createdAt.toString(),
    updatedAt: ({ updatedAt }: PhotoDoc, args, context) => updatedAt.toString(),
  },
};
