// Import all resolvers.
import { countryResolvers } from './country.resolver';
import { photoResolvers } from './photo.resolver';
import { uploadResolvers } from './upload.resolver';
import { userResolvers } from './user.resolver';

// Export all resolvers as an array.
export const resolvers = [
  countryResolvers,
  photoResolvers,
  uploadResolvers,
  userResolvers,
];
