import { Schema, model, Types, PaginateResult } from 'mongoose';
import mongoosePaginate from 'mongoose-paginate-v2';
import { deletePhoto, getUploadUrl, tagPhotoByCountry } from '../utils';
import { config } from '../config';
import { User } from './user';
import { Country } from './country';
import {
  AddPhotoArgs,
  CountryAttributes,
  CurrentUser,
  FindPhotosArgs,
  GetPresignedUrlArgs,
  PhotoAttributes,
  PhotoDoc,
  PhotoModel,
  PhotoPopulatedDoc,
  UserDoc,
} from '../types';

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
      default: '',
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
  limit = config.requestedPhotosLimit,
  page = 1,
}: FindPhotosArgs): Promise<PaginateResult<PhotoDoc>> {
  // Validate page and limit variables.
  if (page < 1 || limit < 1) {
    throw new Error('Page or limit cannot be less than 1.');
  }

  // Create pagination options variable.
  const paginationOptions = {
    // Return in specified order.
    sort: { createdAt: 'descending' },
    // Passed user specified pagination criteria.
    limit,
    page,
  };

  // Create an empty mongoose query.
  let query: { country?: Types.ObjectId; featured?: boolean } = {};

  // If there is a country that need to be searched for, build new query.
  if (country) {
    // Form trimmed and case-insensitive country name ready for query.
    // Find searched country.
    let foundCountry = await Country.findOne({
      name: new RegExp(country.trim(), 'i'),
    });

    // If found a country, build a query with its id.
    if (foundCountry) {
      query = { country: foundCountry.id };
    }
  }

  // If featured, add an additional query param featured.
  if (featured) {
    query.featured = featured;
  }

  // Make a query using mongoose-paginate library.
  const result = await Photo.paginate(query, paginationOptions);

  if (!result) {
    throw new Error('Cannot get requested photos.');
  }

  // Return requested photos.
  console.log(
    `(GraphQL) ${
      country && featured
        ? `Visited /photos/featured/${country}. `
        : country
        ? `Visited /photos/${country}. `
        : featured
        ? `Visited /photos/featured. `
        : 'Visited /photos. '
    }Found ${result.docs.length} photos from page ${page}/${
      result.totalPages
    }. Requested ${limit} out of ${
      result.totalDocs
    } photos meeting query criteria.`
  );

  // Return page of photos.
  return result;
};

/**
 * Obtains a signed url from the AWS S3.
 * 1. Validate inputs.
 * 2. Obtain the signed url.
 */
photoSchema.statics.getPresignedUrl = async function ({
  country,
  type,
  size,
}: GetPresignedUrlArgs) {
  // Input validation check.
  if (!country) {
    throw new Error('Must provide a country name');
  }
  if (country.length < 3) {
    throw new Error('Country name must contain at least 3 characters');
  }
  if (!type) {
    throw new Error('Must upload a file');
  }
  if (!type.match(/image\/jpeg/gi)) {
    throw new Error('File type must be of image/jpeg');
  }
  if (!size || size === 0) {
    throw new Error('Must upload a file');
  }
  if (size > config.maxImageSize) {
    throw new Error(
      `File size cannot exceed ${config.maxImageSize / 1000000} MB`
    );
  }

  return await getUploadUrl();
};

// Creates a photo and associates it with user.
photoSchema.statics.addPhoto = async function (
  { id }: CurrentUser,
  args: AddPhotoArgs
): Promise<PhotoDoc> {
  // Pull off args.
  const { country, caption, featured, key, size } = args;

  // Add a tag to the uploaded asset.
  await tagPhotoByCountry(key, country);

  // Print out a log about the updated asset.
  console.log(`(AWS S3) Uploaded asset ${key}.`);

  // Input validation check.
  if (!key) {
    throw new Error('Must provide a key');
  }

  // Check if country exists.
  const existingCountry = await Country.findOne({
    name: country,
  });

  // Define country id.
  let countryId: Types.ObjectId;

  if (existingCountry) {
    // Get ID from existing country and assign it to new photo.
    countryId = existingCountry.id;
  } else {
    // If country does not exist, create a new one.
    const newCountry = { name: country };
    const createdCountry = await Country.create<CountryAttributes>(newCountry);
    // Get ID from created country and assign it to new photo.
    countryId = createdCountry.id;

    if (!createdCountry) {
      throw new Error('Could not create new country.');
    }
  }

  // Create new photo object.
  const newPhoto: PhotoAttributes = {
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
  const createdPhoto = await Photo.create<PhotoAttributes>(newPhoto);

  if (!createdPhoto) {
    throw new Error('Could not create new photo.');
  }

  // Find user and update it's photos.
  const user = await User.findById(id);

  if (!user) {
    throw new Error('User is not logged in or does not exist');
  }

  user.photos = [...user.photos, createdPhoto.id];
  const savedUser = await user.save();

  if (!savedUser) {
    throw new Error('Cannot assign the new photo to the user.');
  }

  // Find country and update it's photos.
  const foundCountry = await Country.findById(countryId);

  if (!foundCountry) {
    throw new Error('Country does not exist');
  }

  foundCountry.photos = [...foundCountry.photos, createdPhoto.id];
  const savedCountry = await foundCountry.save();

  if (!savedCountry) {
    throw new Error('Cannot assign the new photo to the country.');
  }

  // Return newly created photo.
  console.log(
    `(GraphQL) Added photo from ${savedCountry.name} (${createdPhoto.upload.key}) by ${savedUser.username} (${savedUser.id})`
  );
  return createdPhoto;
};

photoSchema.statics.findPopulated = async function (id: Types.ObjectId) {
  return await Photo.findByIdAndDelete(id)
    .populate('country')
    .populate('author');
};

// Delete a photo and update user.
photoSchema.statics.deletePhoto = async function (
  id: Types.ObjectId
): Promise<PhotoPopulatedDoc> {
  // Delete photo and populate author field to access his id.
  const deletedPhoto: PhotoPopulatedDoc = (await Photo.findPopulated(id))
    .populate('country')
    .populate('author');

  if (!deletedPhoto.author || !deletedPhoto.country) {
    throw new Error('Cannot delete photo. Photo does not exist.');
  }

  // Delete a photo from AWS S3 by the key property.
  await deletePhoto(deletedPhoto.upload.key);

  // Get user by id to modify photos array.
  const user: UserDoc | null = await User.findById(deletedPhoto.author.id);

  if (!user) {
    throw new Error('User does not exist.');
  }

  // Update user with updated photos array.
  const updatedUser = await User.findByIdAndUpdate(
    deletedPhoto.author.id,
    { photos: user.photos.filter(photoId => photoId != id) },
    { new: true }
  );

  if (!updatedUser) {
    throw new Error('Cannot update user. User does not exist.');
  }

  // Get country by id to modify photos array.
  const country = await Country.findById(deletedPhoto.country.id);

  if (!country) {
    throw new Error('Country does not exist.');
  }

  // Update country with updated photos array.
  const updatedCountry = await Country.findByIdAndUpdate(
    deletedPhoto.country.id,
    { photos: country.photos.filter(photoId => photoId != id) },
    { new: true }
  );

  if (!updatedCountry) {
    throw new Error('Cannot update country. Country does not exist.');
  }

  // Delete country if the removed photo was the last from this country.
  if (updatedCountry.photos?.length === 0) {
    const deletedCountry = await Country.findByIdAndDelete(updatedCountry.id);

    if (!deletedCountry) {
      throw new Error('Cannot delete country. Country does not exist.');
    }
    console.log(`(MongoDB) Deleted ${deletedCountry.name} country.`);
  }

  // Return deleted photo.
  console.log(
    `(GraphQL) Deleted photo from ${updatedCountry.name} (${deletedPhoto.id}) by ${updatedUser.username} (${updatedUser.id})`
  );
  return deletedPhoto;
};

// Delete a photo and update user.
photoSchema.statics.clickPhoto = async function (
  id: Types.ObjectId
): Promise<PhotoDoc> {
  const clickedPhoto = await Photo.findByIdAndUpdate(id, {
    $inc: { clicks: 1 },
  });

  if (!clickedPhoto) {
    throw new Error('Photo not found');
  }

  console.log(
    `(GraphQL) Clicked photo ${clickedPhoto.caption} (${clickedPhoto.id}).`
  );
  return clickedPhoto;
};

// Create model out of schema.
export const Photo = model<PhotoDoc | PhotoPopulatedDoc, PhotoModel>(
  'Photo',
  photoSchema
);
