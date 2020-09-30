// Import resolver guards.
import { isAuthenticated } from '../utils';

// Create and immediately export default resolvers.
export const uploadResolvers = {
  Mutation: {
    getPresignedUrl: isAuthenticated(
      async (parent, args, { models }) =>
        await models.Photo.getPresignedUrl(args)
    ),
  },
};
