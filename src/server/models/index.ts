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
export const connectDb = async () => {
  try {
    await connect(
      config.databaseUrl,
      {
        useNewUrlParser: true,
        useCreateIndex: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      },
      () => console.log('(MongoDB) Conntected to the database.')
    );
  } catch (error) {
    throw new Error(error);
  }
};
