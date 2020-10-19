import { Types } from 'mongoose';
import { isAuthenticated } from '../utils';
import { LogInArgs, Resolvers, UserAttributes, UserDoc } from '../types';

// Create and immediately export resolvers.
export const userResolvers: Resolvers<UserDoc> = {
  Query: {
    users: async (parent, args, { models }) => await models.User.find({}),
    user: async (parent, { id }: { id: Types.ObjectId }, { models }) =>
      await models.User.findById(id),
    userByLogin: async (parent, { login }: { login: string }, { models }) =>
      await models.User.findByLogin(login),
    me: async (parent, args, { models, me }) =>
      me ? await models.User.findById(me.id) : null,
  },

  Mutation: {
    signUp: async (parent, args: UserAttributes, { models }) =>
      await models.User.signUp(args),
    logIn: async (parent, args: LogInArgs, { models }) =>
      await models.User.logIn(args),
    updateUser: isAuthenticated(
      async (parent, args: UserDoc, { models, me }) =>
        await models.User.findByIdAndUpdate(me.id, args, { new: true })
    ),
    deleteUser: isAuthenticated(
      async (parent, args, { models, me }) =>
        await models.User.deleteUser(me.id)
    ),
  },

  User: {
    photos: async ({ id }, args, { models }) =>
      await models.Photo.find({ author: id }),
    createdAt: ({ createdAt }) => createdAt.toString(),
    updatedAt: ({ updatedAt }) => updatedAt.toString(),
  },
};
