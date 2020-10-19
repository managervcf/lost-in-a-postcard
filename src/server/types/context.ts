import { models } from '../models';
import { CurrentUser } from './';

/**
 * Global shared Context between resolvers.
 */
export interface Context {
  models: typeof models;
  me: CurrentUser;
}
