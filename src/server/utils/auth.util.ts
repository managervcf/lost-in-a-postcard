import { Request } from 'express';
import { sign, verify } from 'jsonwebtoken';
import { config } from '../config';
import { CurrentUser, FieldResolver } from '../types';

/**
 * Creates an authentication token.
 */
export function createToken({
  id,
  email,
  username,
  role,
}: CurrentUser): string {
  return sign({ id, email, username, role }, config.jwt.secret, {
    expiresIn: config.jwt.expiryTime,
  });
}

/**
 * Retrieves the token from the request headers and
 * verifies it returning the payload hidden behind it.
 */
export function getCurrentUser(request: Request): CurrentUser | null {
  const { token } = request.headers;
  if (token && !Array.isArray(token)) {
    try {
      const result = verify(token, config.jwt.secret) as CurrentUser;
      return result;
    } catch (error) {
      return null;
    }
  } else {
    return null;
  }
}

/**
 * Authentication guard. Checks if the user is logged in.
 */
export const isAuthenticated =
  <TSource, TArgs>(
    next: FieldResolver<TSource, TArgs>
  ): FieldResolver<TSource, TArgs> =>
  (parent, args, context, info): FieldResolver<TSource, TArgs> =>
    !context.me
      ? new Error('Unauthenticated. Please log in.')
      : next(parent, args, context, info);

/**
 * Authorization guard. Checks if the current user is an admin.
 * 1. Destructure me and models out of context.
 * 2. If user is not logged in, throw an error.
 * 3. If user is an admin, let him through and return resolver.
 * 4. Otherwise, let user through and return resolver.
 * @param {function} next
 */
export const isAuthorized =
  <TSource, TArgs>(
    next: FieldResolver<TSource, TArgs>
  ): FieldResolver<TSource, TArgs> =>
  (parent, args, context, info): FieldResolver<TSource, TArgs> => {
    const { me } = context;

    if (!me) {
      throw new Error('Unauthenticated. Please log in.');
    }

    if (me.role !== 'admin') {
      throw new Error('Unauthorized. You are not an admin.');
    }

    return next(parent, args, context, info);
  };
