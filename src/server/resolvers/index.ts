// Import all resolvers.
import { countryResolvers } from './country';
import { photoResolvers } from './photo';
import { uploadResolvers } from './upload';
import { userResolvers } from './user';

// Export all resolvers as an array.
export const resolvers = [
  countryResolvers,
  photoResolvers,
  uploadResolvers,
  userResolvers,
];
