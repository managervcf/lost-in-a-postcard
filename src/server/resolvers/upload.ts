// Import resolver guards.
import { isAuthenticated } from '../utils';
import { GetPresignedUrlArgs, UploadResolvers } from '../types';

// Create and immediately export default resolvers.
export const uploadResolvers: UploadResolvers = {
  Query: {},
  Mutation: {
    getPresignedUrl: isAuthenticated(
      async (parent, args: GetPresignedUrlArgs, { models }) =>
        await models.Photo.getPresignedUrl(args)
    ),
  },
};
