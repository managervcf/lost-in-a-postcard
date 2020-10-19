import { FieldResolver } from '../types';

/**
 * Authentication guard. Checks if the user is logged in.
 */
export const isAuthenticated = <TSource, TArgs>(
  next: FieldResolver<TSource, TArgs>
): FieldResolver<TSource, TArgs> => (
  parent,
  args,
  context,
  info
): FieldResolver<TSource, TArgs> =>
  !context.me
    ? new Error('Unauthenticated. Please log in.')
    : next(parent, args, context, info);
