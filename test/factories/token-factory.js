import jwt from 'jsonwebtoken';

/**
 *
 * @param {{ id: string, username: string, email: string, role?: string }}
 * @returns {string}
 */
export const tokenFactory = ({ id, username, email, role = 'tester' }) =>
  jwt.sign({ id, username, email, role }, process.env.JWT_SECRET);
