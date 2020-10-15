import { LogInArgs, UserResolvers } from '../types';
// Import resolver guards.
import { isAuthenticated } from '../utils';

// Create and immediately export default resolvers.
export const userResolvers: UserResolvers = {
  Query: {
    users: async (parent, args, { models }) => await models.User.find({}),
    user: async (parent, { id }, { models }) => await models.User.findById(id),
    userByLogin: async (parent, { login }, { models }) =>
      await models.User.findByLogin(login),
    me: async (parent, args, { models, me }) =>
      me ? await models.User.findById(me.id) : null,
  },

  Mutation: {
    signUp: async (parent, args, { models }) => await models.User.signUp(args),
    logIn: async (parent, args: LogInArgs, { models }) =>
      await models.User.logIn(args),
    updateUser: isAuthenticated(
      async (parent, args, { models, me }) =>
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
