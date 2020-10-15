import { Context } from './';

export type ResolverFn = (
  parent: any,
  args: any,
  ctx: Context,
  info: any
) => any;

interface ResolverMap {
  [field: string]: ResolverFn;
}

interface BaseResolvers {
  Query: ResolverMap;
  Mutation: ResolverMap;
}

export interface CountryResolvers extends BaseResolvers {
  Country: ResolverMap;
}

export interface PhotoResolvers extends BaseResolvers {
  Photo: ResolverMap;
}

export interface UserResolvers extends BaseResolvers {
  User: ResolverMap;
}

export interface UploadResolvers extends BaseResolvers {}
