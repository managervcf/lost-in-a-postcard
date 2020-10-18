import { Context, ResolverFn } from '../types';

/**
 * Authorization guard. Checks if the user is a photo owner
 * or an admin.
 * 1. Destructure me and models out of context.
 * 2. If user is not logged in, throw an error.
 * 3. If user is an admin, let him through and return resolver.
 * 4. If user is not the photo owner, throw an error.
 * 5. Otherwise, let user through and return resolver.
 * @param {function} next
 */
export const isAuthorized = (next: ResolverFn): ResolverFn => async (
  parent: any,
  args: any,
  context: Context,
  info: any
): Promise<ResolverFn> => {
  const { me, models } = context;

  if (!me) {
    throw new Error('Unauthenticated. Please log in.');
  }

  if (me.role === 'admin') {
    return next(parent, args, context, info);
  }

  const photo = await models.Photo.findById(args.id);

  if (photo?.author != me.id) {
    throw new Error('Unauthorized. You are not the photo owner');
  }

  return next(parent, args, context, info);
};
