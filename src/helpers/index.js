// Import all middlewares.
import isAuthenticated from './isAuthenticated';
import isAuthorized from './isAuthorized';
import doesContain from './doesContain';
import trimAndCapitalize from './trimAndCapitalize';
import emailRegex from './emailRegex';
import throwError from './errorHandler';
import getMe from './getMe';
import { uploadAsset, deleteAsset } from './cloudinaryHelpers';

// Export middlewares.
export {
	isAuthenticated,
	isAuthorized,
	doesContain,
	trimAndCapitalize,
	emailRegex,
	throwError,
	getMe,
	uploadAsset,
	deleteAsset
};
