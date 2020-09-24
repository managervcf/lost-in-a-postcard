import 'regenerator-runtime/runtime';
import axios from 'axios';
import { connect } from 'mongoose';
import { models } from '../server/models';
import { testUser, testPhoto, SIGNUP, testPhotoEdited } from './mocks';
import { deleteAsset, deleteAssetsByTag } from '../server/utils';

// Increase test timeout.
jest.setTimeout(40 * 1000);

beforeAll(async () => {
  /**
   * 1. Connect to the database.
   * 2. Signup a test user.
   */
  await connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  });

  await axios.post('http://localhost:4000/graphql', {
    query: SIGNUP,
    variables: testUser,
    headers: { 'Content-Type': 'application/json' },
  });
});

afterAll(async () => {
  /**
   * 1. Delete a user, country, editedCountry, photo, editedPhoto.
   * 3. Delete all photos with a specific tag.
   */
  await models.User.deleteMany({ email: testUser.email });
  await models.Country.deleteMany({ name: testPhoto.country });
  await models.Country.deleteMany({ name: testPhotoEdited.country });
  await models.Photo.deleteMany({ caption: testPhoto.caption });
  await models.Photo.deleteMany({ caption: testPhotoEdited.caption });
  await deleteAssetsByTag(testPhoto.country);
  await deleteAssetsByTag(testPhotoEdited.country);
});
