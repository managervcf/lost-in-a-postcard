import { isAuthenticated } from '../utils';
import { Resolvers } from '../types';
import { UploadService } from '../services/upload';

// Create and immediately export default resolvers.
export const uploadResolvers: Resolvers = {
  Mutation: {
    getPresignedUrl: isAuthenticated(UploadService.getPresignedUrl),
  },
};
