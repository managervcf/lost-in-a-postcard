import { IFieldResolver, IResolvers } from 'apollo-server-express';
import { models } from '../models';
import { Context } from './';

export type Resolvers<T = typeof models> = IResolvers<T, Context>;
export type FieldResolver<T, K = any> = IFieldResolver<T, Context, K>;
