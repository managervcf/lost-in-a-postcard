// Import necessary helpers to verify user out of token.
import jwt from 'jsonwebtoken';
import { AuthenticationError } from 'apollo-server-express';

// Define and export default function that takes a req as aa argument,
// pulls out a token and tries to verify a user.
export default async req => {
	const token = req.headers['x-token'];
	if (token) {
		try {
			return await jwt.verify(token, process.env.JWT_SECRET);
		} catch (e) {
			throw new AuthenticationError('Your session has expired. Sign in again.');
		}
	}
};
