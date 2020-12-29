import { isAuthenticated } from '../utils';
import { GetPresignedUrlArgs, Resolvers } from '../types';
import { UploadService } from '../services/upload';

// Create and immediately export default resolvers.
export const uploadResolvers: Resolvers = {
  Mutation: {
    getPresignedUrl: isAuthenticated(
      (parent, args: GetPresignedUrlArgs, context) =>
        UploadService.getPresignedUrl(args)
    ),
  },
};
