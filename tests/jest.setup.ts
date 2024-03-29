import axios from 'axios';
import { connect, disconnect } from 'mongoose';
import { Country, Photo, User } from '../src/server/models';
import { testUser, testPhoto, SIGNUP, testPhotoEdited } from './mocks';
import { deletePhoto } from '../src/server/utils';
import { config } from '../src/server/config';

// Increase test timeout.
jest.setTimeout(60 * 1000);

/**
 * 1. Connect to the database.
 * 2. Signup the test user.
 */
beforeAll(async () => {
  await connect(config.databaseUrl);

  await axios.post(`http://localhost:4000/graphql`, {
    query: SIGNUP,
    variables: testUser,
    headers: { 'Content-Type': 'application/json' },
  });
});

/**
 * 1. Delete a test user, a test country and also an edited test country.
 * 2. Recursively delete test photos and edited test photos from the database
 *    as well as from the AWS S3.
 * 3. Disconnect from the database.
 */
afterAll(async () => {
  await User.deleteMany({ email: testUser.email });
  await Country.deleteMany({ name: testPhoto.country });
  await Country.deleteMany({ name: testPhotoEdited.country });

  let photo = await Photo.findOneAndDelete({
    caption: testPhoto.caption,
  });
  let editedPhoto = await Photo.findOneAndDelete({
    caption: testPhotoEdited.caption,
  });

  while (photo || editedPhoto) {
    if (photo) {
      await deletePhoto(photo.upload.key);
    }
    if (editedPhoto) {
      await deletePhoto(editedPhoto.upload.key);
    }

    photo = await Photo.findOneAndDelete({
      caption: testPhoto.caption,
    });
    editedPhoto = await Photo.findOneAndDelete({
      caption: testPhotoEdited.caption,
    });
  }
  await disconnect();
});
