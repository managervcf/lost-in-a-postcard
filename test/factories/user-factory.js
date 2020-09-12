import { models } from '../../server/models';
import { testUser } from '../mocks';

/**
 * Creates a new user and saves it to the database.
 * @returns {Promise}
 */
export const userFactory = async () => await new models.User(testUser).save();
