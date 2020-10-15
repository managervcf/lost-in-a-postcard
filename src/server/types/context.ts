import { models } from '../models';
import { CurrentUser } from './';

export interface Context {
  models: typeof models;
  me: CurrentUser;
}
