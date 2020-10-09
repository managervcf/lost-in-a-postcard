// Import helper to connect with database.
import { connect } from 'mongoose';

// Import all models.
import User from './user';
import Photo from './photo';
import Country from './country';

// Define a function that connects to database.
// Pass options to avoid deprecation warnings.
export const connectDb = async () =>
  await connect(
    process.env.DATABASE_URL,
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
