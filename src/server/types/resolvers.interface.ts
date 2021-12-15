import { IFieldResolver, IResolvers } from 'graphql-tools/';
import { Context } from '.';

export type Resolvers<T = any> = IResolvers<T, Context>;
export type FieldResolver<T, K = any> = IFieldResolver<T, Context, K>;
