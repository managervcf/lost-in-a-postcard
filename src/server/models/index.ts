import { connect } from 'mongoose';
import { config } from '../config';

/**
 * Export an unified models interface.
 */
export { User } from './user.model';
export { Photo } from './photo.model';
export { Country } from './country.model';

/**
 * Connects to the database.
 */
export const connectDb = async () =>
  await connect(config.databaseUrl, err =>
    !err
      ? console.log('(MongoDB) Conntected to the database.')
      : console.error(`(MongoDB) Error while connecting to the database: ${err}`)
  );
