import { CurrentUser } from './';

/**
 * Global shared Context between resolvers.
 */
export interface Context {
  me: CurrentUser;
}
