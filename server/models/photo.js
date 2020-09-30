// Import helper functions from mongoose.
import { Schema, model } from 'mongoose';

// Import pagination helper library.
import mongoosePaginate from 'mongoose-paginate-v2';

// Import helpers and error handler from middleware.
import { throwError, deletePhoto, getUploadUrl } from '../utils';

// Import config options.
import { requestedPhotosLimit, maxImageSize } from '../config';

// Import models.
import User from './user';
import Country from './country';

// Define schema.
const photoSchema = new Schema(
  {
    upload: {
      size: {
        type: Number,
        required: true,
      },
      key: {
        type: String,
        required: true,
      },
    },
    caption: {
      type: String,
      trim: true,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    clicks: {
      type: Number,
      default: 0,
      min: [0, 'Cannot set clicks to less than 0.'],
    },
    country: {
      type: Schema.Types.ObjectId,
      ref: 'Country',
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  // Enable auto timestamps.
  { timestamps: true }
);

// Insert plugins.
photoSchema.plugin(mongoosePaginate);

//// BUSINESS LOGIC.

// Find and paginate requested photos. Default max photos is 100.
photoSchema.statics.findPhotos = async function ({
  country = '',
  featured,
  limit = requestedPhotosLimit,
  page = 1,
}) {
  // Validate page and limit variables.
  throwError(page < 1 || limit < 1, 'Page or limit cannot be less than 1.');

  // Create pagination options variable.
  const paginationOptions = {
    // Return in specified order.
    sort: { createdAt: 'descending' },
    // Passed user specified pagination criteria.
    limit,
    page,
  };

  // Create an empty mongoose query.
  let query = {};

  // If there is a country that need to be searched for, build new query.
  if (country) {
    // Form trimmed and case-insensitive country name ready for query.
    query.name = new RegExp(country.trim(), 'i'); // 'i' - case-insensitive flag

    // Find searched country.
    let foundCountry = await Country.findOne(query);

    // If found a country, build a query with its id.
    query = foundCountry ? { country: foundCountry.id } : { country: null };
  }

  if (featured) {
    query.featured = featured;
  }

  // Make a query using mongoose-paginate library.
  const res = await Photo.paginate(query, paginationOptions);
  throwError(!res, 'Cannot get requested photos.');

  // Return requested photos.
  console.log(
    `(GraphQL) ${
      country ? `Searched for ${country}. ` : 'No search phrase. '
    }Retrieved ${res.docs.length} photos from page ${page}/${
      res.totalPages
    }. Requested ${limit} out of ${res.total} photos meeting query criteria.`
  );

  // Return page of photos.
  return {
    docs: res.docs,
    pageInfo: {
      ...res,
    },
  };
};

/**
 * Obtains a signed url from the AWS S3.
 * 1. Validate inputs.
 * 2. Obtain the signed url.
 * @param {{ country: string, type: string, size: string }}
 * @returns {{ url: string, key: string }}
 */
photoSchema.statics.getPresignedUrl = async function ({ country, type, size }) {
  // Input validation check.
  throwError(!country, 'Must provide a country name');
  throwError(
    country.length < 3,
    'Country name must contain at least 3 characters'
  );
  throwError(!type, 'Must upload a file');
  throwError(!type.match(/image\/jpeg/gi), 'File type must be of image/jpeg');
  throwError(!size || size === 0, 'Must upload a file');
  throwError(
    size > maxImageSize,
    `File size cannot exceed ${maxImageSize / 1000000} MB`
  );

  return await getUploadUrl();
};

// Creates a photo and associates it with user.
photoSchema.statics.addPhoto = async function ({ id }, args) {
  // Pull off args.
  const { country, caption, featured, key, size } = args;

  // Print out a log about the updated asset.
  console.log(`(AWS S3) Uploaded asset ${key}.`);

  // Input validation check.
  throwError(!key, 'Must provide a key');

  // Check if country exists.
  const existingCountry = await Country.findOne({
    name: country,
  });

  // Define country id.
  let countryId = '';

  if (existingCountry) {
    // Get ID from existing country and assign it to new photo.
    countryId = existingCountry.id;
  } else {
    // If country does not exist, create a new one.
    const newCountry = { name: country };
    const createdCountry = await Country.create(newCountry);
    // Get ID from created country and assign it to new photo.
    countryId = createdCountry.id;
    throwError(!createdCountry, 'Could not create new country.');
  }

  // Create new photo object.
  const newPhoto = {
    upload: {
      key,
      size,
    },
    caption,
    featured,
    author: id,
    country: countryId,
  };

  // Save photo to database.
  const createdPhoto = await Photo.create(newPhoto);
  throwError(!createdPhoto, 'Could not create new photo.');

  // Find user and update it's photos.
  const user = await User.findById(id);
  throwError(!user, 'User is not logged in or does not exist');
  user.photos = [...user.photos, createdPhoto.id];
  const savedUser = await user.save();
  throwError(!savedUser, 'Cannot assign new photo to user.');

  // Find country and update it's photos.
  const foundCountry = await Country.findById(countryId);
  throwError(!foundCountry, 'Country does not exist');
  foundCountry.photos = [...foundCountry.photos, createdPhoto.id];
  const savedCountry = await foundCountry.save();
  throwError(!savedCountry, 'Cannot assign new photo to country.');

  // Return newly created photo.
  console.log(
    `(GraphQL) Added photo from ${savedCountry.name} (${createdPhoto.upload.key}) by ${savedUser.username} (${savedUser.id})`
  );
  return createdPhoto;
};

// Delete a photo and update user.
photoSchema.statics.deletePhoto = async function (id) {
  // Delete photo and populate author field to access his id.
  const deletedPhoto = await Photo.findByIdAndDelete(id)
    .populate('country')
    .populate('author');
  throwError(!deletedPhoto, 'Cannot delete photo. Photo does not exist.');

  // Delete a photo from AWS S3 by the key property.
  await deletePhoto(deletedPhoto.upload.key);

  // Get user by id to modify photos array.
  const user = await User.findById(deletedPhoto.author.id);
  throwError(!user, 'User does not exist.');

  // Update user with updated photos array.
  const updatedUser = await User.findByIdAndUpdate(
    deletedPhoto.author.id,
    { photos: user.photos.filter(photoId => photoId != id) },
    { new: true }
  );
  throwError(!updatedUser, 'Cannot update user. User does not exist.');

  // Get country by id to modify photos array.
  const country = await Country.findById(deletedPhoto.country.id);
  throwError(!country, 'Country does not exist.');

  // Update country with updated photos array.
  const updatedCountry = await Country.findByIdAndUpdate(
    deletedPhoto.country.id,
    { photos: country.photos.filter(photoId => photoId != id) },
    { new: true }
  );

  throwError(!updatedCountry, 'Cannot update country. Country does not exist.');

  // Delete country if the removed photo was the last from this country.
  if (updatedCountry.photos.length === 0) {
    const deletedCountry = await Country.findByIdAndDelete(updatedCountry.id);
    throwError(
      !deletedCountry,
      'Cannot delete country. Country does not exist.'
    );
    console.log(`(MongoDB) Deleted ${deletedCountry.name} country.`);
  }

  // Return deleted photo.
  console.log(
    `(GraphQL) Deleted photo from ${updatedCountry.name} (${deletedPhoto.id}) by ${updatedUser.username} (${updatedUser.id})`
  );
  return deletedPhoto;
};

// Delete a photo and update user.
photoSchema.statics.clickPhoto = async function (id) {
  const clickedPhoto = await Photo.findByIdAndUpdate(id, {
    $inc: { clicks: 1 },
  });
  console.log(
    `(GraphQL) Clicked photo ${clickedPhoto.caption} (${clickedPhoto.id}).`
  );
  return clickedPhoto;
};

// Create model out of schema.
const Photo = model('Photo', photoSchema);

// Export deafult model.
export default Photo;
