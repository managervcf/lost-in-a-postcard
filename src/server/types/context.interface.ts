import { CurrentUser } from './';
import { dataloaders } from '../dataloaders';

/**
 * Global shared Context between resolvers.
 */
export interface Context {
  me: CurrentUser;
  dataloaders: typeof dataloaders;
}
