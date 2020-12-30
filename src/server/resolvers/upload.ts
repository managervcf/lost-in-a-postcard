import { isAuthenticated } from '../utils';
import { uploadService } from '../services';
import { GetPresignedUrlArgs, Resolvers } from '../types';

// Create and immediately export default resolvers.
export const uploadResolvers: Resolvers = {
  Mutation: {
    getPresignedUrl: isAuthenticated(
      (parent, args: GetPresignedUrlArgs, context) =>
        uploadService.getPresignedUrl(args)
    ),
  },
};
