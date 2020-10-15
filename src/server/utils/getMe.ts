// Import necessary helpers to verify user out of token.
import { Request } from 'express';
import { verify } from 'jsonwebtoken';
import { CurrentUser } from '../types';

// Define and export default function that takes a req as an argument,
// pulls out a token and tries to verify a user.
export const getMe = (req: Request): CurrentUser | null => {
  const { token } = req.headers;
  if (token && !Array.isArray(token)) {
    try {
      const result = verify(token, process.env.JWT_SECRET!) as CurrentUser;
      return result;
    } catch (error) {
      return null;
    }
  }
  return null;
};
