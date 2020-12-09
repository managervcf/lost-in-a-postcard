import { Types, PaginateResult, PaginateOptions } from 'mongoose';
import { config } from '../config';
import {
  AddPhotoArgs,
  CountryAttributes,
  CountryDoc,
  FieldResolver,
  FindPhotosArgs,
  PhotoAttributes,
  PhotoDoc,
  UpdatePhotoArgs,
  UserDoc,
} from '../types';
import { tagPhotoByCountry, deletePhoto } from '../utils';

export abstract class PhotoService {
  /**
   * Finds a photo based on the id.
   */
  static findPhoto: FieldResolver<PhotoDoc, { id: Types.ObjectId }> = async (
    parent,
    { id },
    { models }
  ): Promise<PhotoDoc> => {
    const foundPhoto = await models.Photo.findById(id);

    if (!foundPhoto) {
      throw new Error(`Photo with an id '${id}' does not exist`);
    }

    return foundPhoto;
  };

  /**
   * Finds and paginates requested photos.
   */
  static findPhotos: FieldResolver<PhotoDoc, FindPhotosArgs> = async (
    parent,
    { country, featured, page = 1, limit = config.requestedPhotosLimit },
    { models }
  ): Promise<PaginateResult<PhotoDoc>> => {
    // Validate page and limit variables.
    if (page < 1 || limit < 1) {
      throw new Error('Page or limit cannot be less than 1.');
    }

    // Create pagination options variable.
    const paginationOptions: PaginateOptions = {
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
      let foundCountry = await models.Country.findOne({
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
    const result = await models.Photo.paginate(query, paginationOptions);

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
   * Creates a photo and associates it with user.
   */
  static addPhoto: FieldResolver<PhotoDoc> = async (
    parent,
    args: AddPhotoArgs,
    { me, models }
  ): Promise<PhotoDoc> => {
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
    const existingCountry = await models.Country.findOne({
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
      const createdCountry = await models.Country.create<CountryAttributes>(
        newCountry
      );
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
      author: me.id,
      country: countryId,
    };

    // Save photo to database.
    const createdPhoto = await models.Photo.create<PhotoAttributes>(newPhoto);

    if (!createdPhoto) {
      throw new Error('Could not create new photo.');
    }

    // Find user and update it's photos.
    const user = await models.User.findById(me.id);

    if (!user) {
      throw new Error('User is not logged in or does not exist');
    }

    user.photos = [...user.photos, createdPhoto.id];
    const savedUser = await user.save();

    if (!savedUser) {
      throw new Error('Cannot assign the new photo to the user.');
    }

    // Find country and update it's photos.
    const foundCountry = await models.Country.findById(countryId);

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

  static updatePhoto: FieldResolver<PhotoDoc, UpdatePhotoArgs> = async (
    parent,
    args: UpdatePhotoArgs,
    { models }
  ): Promise<PhotoDoc> => {
    const updatedPhoto = await models.Photo.findByIdAndUpdate(args.id, args, {
      new: true,
      runValidators: true,
    });

    if (!updatedPhoto) {
      throw new Error(`Cannot update a photo with an id ${args.id}`);
    }

    return updatedPhoto;
  };

  // Delete a photo and update user.
  static deletePhoto: FieldResolver<PhotoDoc, { id: Types.ObjectId }> = async (
    parent,
    { id },
    { models }
  ): Promise<PhotoDoc> => {
    // Delete photo and populate author field to access his id.
    const deletedPhoto = await models.Photo.findByIdAndDelete(id)
      .populate('country')
      .populate('author');

    if (!deletedPhoto) {
      throw new Error('Cannot delete photo. Photo does not exist.');
    }

    if (!(deletedPhoto.country instanceof models.Country)) {
      throw new Error('Cannot populate photo with country');
    }

    if (!(deletedPhoto.author instanceof models.User)) {
      throw new Error('Cannot populate photo with country');
    }

    // Delete a photo from AWS S3 by the key property.
    await deletePhoto(deletedPhoto.upload.key);

    // Get user by id to modify photos array.
    const user = await models.User.findById(deletedPhoto.author.id);

    if (!user) {
      throw new Error('User does not exist.');
    }

    // Update user with updated photos array.
    const updatedUser = await models.User.findByIdAndUpdate(
      deletedPhoto.author.id,
      { photos: user.photos.filter(photoId => photoId != id) },
      { new: true }
    );

    if (!updatedUser) {
      throw new Error('Cannot update user. User does not exist.');
    }

    // Get country by id to modify photos array.
    const country = await models.Country.findById(deletedPhoto.country.id);

    if (!country) {
      throw new Error('Country does not exist.');
    }

    // Update country with updated photos array.
    const updatedCountry = await models.Country.findByIdAndUpdate(
      deletedPhoto.country.id,
      { photos: country.photos.filter(photoId => photoId != id) },
      { new: true }
    );

    if (!updatedCountry) {
      throw new Error('Cannot update country. Country does not exist.');
    }

    // Delete country if the removed photo was the last from this country.
    if (updatedCountry.photos?.length === 0) {
      const deletedCountry = await models.Country.findByIdAndDelete(
        updatedCountry.id
      );

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

  /**
   * Increments the clicks proptery on the photo.
   */
  static clickPhoto: FieldResolver<PhotoDoc, { id: Types.ObjectId }> = async (
    parent,
    { id },
    { models }
  ): Promise<PhotoDoc> => {
    const clickedPhoto = await models.Photo.findByIdAndUpdate(id, {
      $inc: { clicks: 1 },
    });

    if (!clickedPhoto) {
      throw new Error(`Photo with an id ${id} does not exist`);
    }

    console.log(
      `(GraphQL) Clicked photo ${clickedPhoto.caption} (${clickedPhoto.id}).`
    );
    return clickedPhoto;
  };

  static author: FieldResolver<PhotoDoc, { id: Types.ObjectId }> = async (
    { author },
    args,
    { models }
  ): Promise<UserDoc> => {
    if (author instanceof models.User) {
      throw new Error(`Cannot find a user, ${author} is not a valid id.`);
    } else {
      const foundUser = await models.User.findById(author);

      if (!foundUser) {
        throw new Error(`Cannot find a user with an id ${author}`);
      }

      return foundUser;
    }
  };

  static country: FieldResolver<PhotoDoc, { id: Types.ObjectId }> = async (
    { country },
    args,
    { models }
  ): Promise<CountryDoc> => {
    if (country instanceof models.Country) {
      throw new Error(`Cannot find a country, ${country} is not a valid id.`);
    } else {
      const foundCountry = await models.Country.findById(country);

      if (!foundCountry) {
        throw new Error(`Cannot find a country with an id ${country}`);
      }

      return foundCountry;
    }
  };
}