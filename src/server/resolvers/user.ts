import { userService } from '../services';
import { isAuthenticated } from '../utils';
import {
  LogInArgs,
  Resolvers,
  UpdateUserArgs,
  UserAttributes,
  UserDoc,
} from '../types';

// Create and immediately export resolvers.
export const userResolvers: Resolvers<UserDoc> = {
  Query: {
    me: (parent, args, { me }) => userService.getMe(me),
    userByLogin: (parent, { login }: { login: string }) =>
      userService.getUserByLogin(login),
    users: (parent, args) => userService.getUsers(),
  },

  Mutation: {
    signUp: (parent, args: UserAttributes, context) => userService.signUp(args),
    logIn: (parent, args: LogInArgs, context) => userService.logIn(args),
    updateUser: isAuthenticated((parent, args: UpdateUserArgs, { me }) =>
      userService.updateUser(args, me)
    ),
    deleteUser: isAuthenticated((parent, args, { me }) =>
      userService.deleteUser(me)
    ),
  },

  User: {
    photos: ({ id }, args, context) => userService.getPhotos(id),
    createdAt: ({ createdAt }, args, context) => createdAt.toDateString(),
    updatedAt: ({ updatedAt }, args, context) => updatedAt.toDateString(),
  },
};
