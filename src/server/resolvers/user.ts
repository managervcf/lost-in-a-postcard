import { isAuthenticated } from '../utils';
import {
  LogInArgs,
  Resolvers,
  UpdateUserArgs,
  UserAttributes,
  UserDoc,
} from '../types';
import { UserService } from '../services';

// Create and immediately export resolvers.
export const userResolvers: Resolvers<UserDoc> = {
  Query: {
    me: (parent, args, context) => UserService.getMe(context),
    userByLogin: (parent, { login }: { login: string }, { models }) =>
      UserService.getUserByLogin(login, models),
    users: (parent, args, { models }) => UserService.getUsers(models),
  },

  Mutation: {
    signUp: (parent, args: UserAttributes, { models }) =>
      UserService.signUp(args, models),
    logIn: (parent, args: LogInArgs, { models }) =>
      UserService.logIn(args, models),
    updateUser: isAuthenticated((parent, args: UpdateUserArgs, context) =>
      UserService.updateUser(args, context)
    ),
    deleteUser: isAuthenticated((parent, args, context) =>
      UserService.deleteUser(context)
    ),
  },

  User: {
    photos: ({ id }, args, { models }) => UserService.getPhotos(id, models),
    createdAt: ({ createdAt }) => createdAt.toDateString(),
    updatedAt: ({ updatedAt }) => updatedAt.toDateString(),
  },
};
