import { isAuthenticated } from '../utils';
import { GetPresignedUrlArgs, Resolvers } from '../types';

// Create and immediately export default resolvers.
export const uploadResolvers: Resolvers = {
  Mutation: {
    getPresignedUrl: isAuthenticated(
      async (parent, args: GetPresignedUrlArgs, { models }) =>
        await models.Photo.getPresignedUrl(args)
    ),
  },
};
