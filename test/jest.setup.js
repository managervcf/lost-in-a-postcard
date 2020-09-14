import 'regenerator-runtime/runtime';
import { connect, disconnect } from 'mongoose';
import { models } from '../server/models';
import { testUser, testPhoto } from './mocks';
import { deleteAsset } from '../server/utils';

// Increase test timeout.
jest.setTimeout(40 * 1000);

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
   * 1. Remove test user, country and photo from the database.
   * 2. Delete the test asset from cloudinary.
   * 2. Disconnect from the database.
   */
  await models.User.findOneAndDelete({ email: testUser.email });
  await models.Country.deleteMany({ name: testPhoto.country });
  const photo = await models.Photo.findOneAndDelete({
    caption: testPhoto.caption,
  });

  if (photo) {
    console.log(`Deleting asset ${photo.upload.public_id}...`);
    await deleteAsset(photo.upload.public_id);
  }

  await disconnect();
});
