// Import all middlewares.
import authenticate from './authentication';
import emailRegex from './emailRegex';
import throwError from './errorHandler';

// Export middlewares.
export { authenticate, emailRegex, throwError };
