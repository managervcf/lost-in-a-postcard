import { Types } from 'mongoose';
import { photoService } from '../services';
import { isAuthenticated, isAuthorized } from '../utils';
import {
  AddPhotoArgs,
  FindPhotosArgs,
  PhotoDoc,
  Resolvers,
  UpdatePhotoArgs,
} from '../types';

// Create and immediately export resolvers.
export const photoResolvers: Resolvers<PhotoDoc> = {
  Query: {
    photo: (parent, { id }, context) => photoService.getPhoto(id),
    photos: (parent, args: FindPhotosArgs, context) => photoService.getPhotos(args),
  },

  Mutation: {
    addPhoto: isAuthenticated((parent, args: AddPhotoArgs, { me }) =>
      photoService.addPhoto(args, me)
    ),
    clickPhoto: (
      parent,
      { id, incrementBy }: { id: Types.ObjectId; incrementBy: number },
      context
    ) => photoService.clickPhoto(id, incrementBy),
    updatePhoto: isAuthorized((parent, args: UpdatePhotoArgs, context) =>
      photoService.updatePhoto(args)
    ),
    deletePhoto: isAuthorized((parent, { id }: { id: Types.ObjectId }, context) =>
      photoService.deletePhoto(id)
    ),
  },

  Photo: {
    country: ({ country }, args, { dataloaders }) => photoService.getCountry(country),
    author: ({ author }, args, context) => photoService.getAuthor(author),
    createdAt: ({ createdAt }, args, context) => createdAt.toString(),
    updatedAt: ({ updatedAt }, args, context) => updatedAt.toString(),
  },
};
