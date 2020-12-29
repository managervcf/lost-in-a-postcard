import { isAuthenticated, isAuthorized } from '../utils';
import {
  AddPhotoArgs,
  FindPhotosArgs,
  PhotoDoc,
  Resolvers,
  UpdatePhotoArgs,
} from '../types';
import { PhotoService } from '../services/photo';
import { Types } from 'mongoose';

// Create and immediately export resolvers.
export const photoResolvers: Resolvers<PhotoDoc> = {
  Query: {
    photo: (parent, { id }, { models }) => PhotoService.getPhoto(id, models),
    photos: (parent, args: FindPhotosArgs, { models }) =>
      PhotoService.getPhotos(args, models),
  },

  Mutation: {
    addPhoto: isAuthenticated((parent, args: AddPhotoArgs, context) =>
      PhotoService.addPhoto(args, context)
    ),
    clickPhoto: (parent, { id }: { id: Types.ObjectId }, { models }) =>
      PhotoService.clickPhoto(id, models),
    updatePhoto: isAuthorized((parent, args: UpdatePhotoArgs, { models }) =>
      PhotoService.updatePhoto(args, models)
    ),
    deletePhoto: isAuthorized(
      (parent, { id }: { id: Types.ObjectId }, { models }) =>
        PhotoService.deletePhoto(id, models)
    ),
  },

  Photo: {
    country: ({ country }, args, { models }) =>
      PhotoService.getCountry(country, models),
    author: ({ author }, args, { models }) =>
      PhotoService.getAuthor(author, models),
    createdAt: ({ createdAt }, args, context) => createdAt.toString(),
    updatedAt: ({ updatedAt }, args, context) => updatedAt.toString(),
  },
};
