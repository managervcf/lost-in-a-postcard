import { Request } from 'express';
import { sign, verify } from 'jsonwebtoken';
import { config } from '../config';
import { CurrentUser } from '../types';

/**
 * Creates an authentication token.
 */
export function createToken(payload: CurrentUser): string {
  return sign(payload, config.jwt.secret, {
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
