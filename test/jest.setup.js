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
   * 2. Recursively delete all test photos from the database and cloudinary.
   * 3. Delete all leftover photos with a specific tag.
   */
  await models.User.findOneAndDelete({ email: testUser.email });
  await models.Country.findOneAndDelete({ name: testPhoto.country });
  await models.Country.findOneAndDelete({ name: testPhotoEdited.country });

  let photo = await models.Photo.findOneAndDelete({
    caption: testPhoto.caption,
  });
  let editedPhoto = await models.Photo.findOneAndDelete({
    caption: testPhotoEdited.caption,
  });

  while (photo || editedPhoto) {
    photo
      ? await deleteAsset(photo.upload.public_id)
      : await deleteAsset(editedPhoto.upload.public_id);

    photo = await models.Photo.findOneAndDelete({
      caption: testPhoto.caption,
    });
    editedPhoto = await models.Photo.findOneAndDelete({
      caption: testPhotoEdited.caption,
    });
  }

  await deleteAssetsByTag(testPhoto.country);
});
