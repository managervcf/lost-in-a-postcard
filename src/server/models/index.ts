import { connect } from 'mongoose';
import { User } from './user';
import { Photo } from './photo';
import { Country } from './country';
import { config } from '../config';

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

/**
 * Export an unified models interface.
 */
export const models = { User, Photo, Country };
