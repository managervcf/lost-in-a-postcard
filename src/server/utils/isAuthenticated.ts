import { Context, ResolverFn } from '../types';

// Authentication helper. Checks if the user is logged in.
// Used to wrap resolvers to block sensitive queries.
export const isAuthenticated = (next: ResolverFn): ResolverFn => (
  parent: any,
  args: any,
  context: Context,
  info: any
): ResolverFn =>
  !context.me
    ? new Error('Unauthenticated. Please log in.')
    : next(parent, args, context, info);
