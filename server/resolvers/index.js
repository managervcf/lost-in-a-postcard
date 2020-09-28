// Import all resolvers.
import { userResolvers } from './user';
import { photoResolvers } from './photo';
import { countryResolvers } from './country';
import { uploadResolvers } from './upload';

// Export all resolvers as an array.
export const resolvers = [
  userResolvers,
  photoResolvers,
  countryResolvers,
  uploadResolvers,
];
