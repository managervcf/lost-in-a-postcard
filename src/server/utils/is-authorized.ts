import { FieldResolver } from '../types';

/**
 * Authorization guard. Checks if the current user is an admin.
 * 1. Destructure me and models out of context.
 * 2. If user is not logged in, throw an error.
 * 3. If user is an admin, let him through and return resolver.
 * 4. Otherwise, let user through and return resolver.
 * @param {function} next
 */
export const isAuthorized = <TSource, TArgs>(
  next: FieldResolver<TSource, TArgs>
): FieldResolver<TSource, TArgs> => (
  parent,
  args,
  context,
  info
): FieldResolver<TSource, TArgs> => {
  const { me } = context;

  if (!me) {
    throw new Error('Unauthenticated. Please log in.');
  }

  if (me.role !== 'admin') {
    throw new Error('Unauthorized. You are not an admin.');
  }

  return next(parent, args, context, info);
};
