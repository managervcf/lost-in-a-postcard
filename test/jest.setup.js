import 'regenerator-runtime/runtime';
import { connect } from 'mongoose';
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
   */
  await models.User.findOneAndDelete({ email: testUser.email });
  await models.Country.findOneAndDelete({ name: testPhoto.country });
  const photo = await models.Photo.findOneAndDelete({
    caption: testPhoto.caption,
  });

  if (photo) {
    await deleteAsset(photo.upload.public_id);
  }
});
