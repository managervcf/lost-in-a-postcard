import { isAuthenticated } from '../utils';
import { Resolvers, UserDoc } from '../types';
import { UserService } from '../services';

// Create and immediately export resolvers.
export const userResolvers: Resolvers<UserDoc> = {
  Query: {
    me: UserService.me,
    userByLogin: UserService.findByLogin,
    users: UserService.users,
  },

  Mutation: {
    signUp: UserService.signUp,
    logIn: UserService.logIn,
    updateUser: isAuthenticated(UserService.updateUser),
    deleteUser: isAuthenticated(UserService.deleteUser),
  },

  User: {
    photos: UserService.photos,
    createdAt: ({ createdAt }) => createdAt.toDateString(),
    updatedAt: ({ updatedAt }) => updatedAt.toDateString(),
  },
};
