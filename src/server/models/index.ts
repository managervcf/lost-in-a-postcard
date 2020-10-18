// Import helper to connect with database.
import { connect } from 'mongoose';

// Import all models.
import { User } from './user';
import { Photo } from './photo';
import { Country } from './country';
import { config } from '../config';

// Define a function that connects to database.
// Pass options to avoid deprecation warnings.

export const connectDb = async () =>
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

// Define an object containing all models.
// Export connectDb and unified models interface.
export const models = { User, Photo, Country };
