// Import all middlewares.
import isAuthenticated from './isAuthenticated';
import isAuthorized from './isAuthorized';
import doesContain from './doesContain';
import emailRegex from './emailRegex';
import throwError from './errorHandler';
import getMe from './getMe';

// Export middlewares.
export {
	isAuthenticated,
	isAuthorized,
	doesContain,
	emailRegex,
	throwError,
	getMe
};
