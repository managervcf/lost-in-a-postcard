import 'regenerator-runtime/runtime';
import { connect, disconnect } from 'mongoose';
import { models } from '../server/models';
import { testUser } from './mocks';

// Increase test timeout.
jest.setTimeout(30 * 1000);

beforeAll(async () => {
  /**
   * 1. Connect to the database.
   */
  await connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });
});

afterAll(async () => {
  /**
   * 1. Remove test user from the database.
   * 2. Disconnect from the database.
   */
  await models.User.deleteMany({ email: testUser.email });
  await disconnect();
});
