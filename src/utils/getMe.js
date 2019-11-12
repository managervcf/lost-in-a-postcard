// Import necessary helpers to verify user out of token.
import jwt from 'jsonwebtoken';

// Define and export default function that takes a req as an argument,
// pulls out a token and tries to verify a user.
export default req => {
	let { token } = req.headers;
	if (token) {
		try {
			return jwt.verify(token, process.env.JWT_SECRET);
		} catch (error) {
			return null;
		}
	}
};
