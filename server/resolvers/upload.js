// Import resolver guards.
import { isAuthenticated } from '../utils';

// Import the AWS S3 helpers.
import { getUploadUrl } from '../utils/awsS3Helpers';

// Create and immediately export default resolvers.
export const uploadResolvers = {
  Mutation: {
    getPresignedUrl: isAuthenticated((parent, args, context) => getUploadUrl()),
  },
};
