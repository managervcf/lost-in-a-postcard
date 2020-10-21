import { isAuthenticated, isAuthorized } from '../utils';
import { PhotoDoc, Resolvers } from '../types';
import { PhotoService } from '../services/photo';

// Create and immediately export resolvers.
export const photoResolvers: Resolvers<PhotoDoc> = {
  Query: {
    photo: PhotoService.findPhoto,
    photos: PhotoService.findPhotos,
  },

  Mutation: {
    addPhoto: isAuthenticated(PhotoService.addPhoto),
    clickPhoto: PhotoService.clickPhoto,
    updatePhoto: isAuthorized(PhotoService.updatePhoto),
    deletePhoto: isAuthorized(PhotoService.deletePhoto),
  },

  Photo: {
    country: PhotoService.country,
    author: PhotoService.author,
    createdAt: ({ createdAt }, args, context) => createdAt.toString(),
    updatedAt: ({ updatedAt }, args, context) => updatedAt.toString(),
  },
};
