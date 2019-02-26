// Import all middlewares.
import authenticated from './authenticated';
import photoOwner from './photoOwner';
import emailRegex from './emailRegex';
import throwError from './errorHandler';
import getMe from './getMe';

// Export middlewares.
export { authenticated, photoOwner, emailRegex, throwError, getMe };
