import { Types } from 'mongoose';
import { UpdateCountryArgs, CountryDoc, PhotoDoc, Context } from '../types';

export abstract class CountryService {
  /**
   * Finds all countries.
   */
  static async getCountries(models: Context['models']): Promise<CountryDoc[]> {
    return models.Country.find({});
  }

  /**
   * Searches for a country with a specific name.
   */
  static async getCountry(
    name: string,
    models: Context['models']
  ): Promise<CountryDoc> {
    const foundCountry = await models.Country.findOne({ name });

    if (!foundCountry) {
      throw new Error(`Cannot find a country with a name ${name}`);
    }

    return foundCountry;
  }

  /**
   * Updates the country record.
   * 1. Perform validation checks.
   * 2. Update the record in the database.
   * 3. Return the updated record.
   */
  static async updateCountry(
    { id, name, description }: UpdateCountryArgs,
    models: Context['models']
  ): Promise<CountryDoc> {
    if (!id) {
      throw new Error('Must provide a country id');
    }
    if (!name) {
      throw new Error('Must provide a country name');
    }

    // Trim the country name.
    name = name.trim();

    if (name.trim().length < 3) {
      throw new Error(
        `Country name '${name}' has a length of ${name.length} and is not a valid name. It must contain at least 3 characters`
      );
    }

    const updatedCountry = await models.Country.findByIdAndUpdate(
      id,
      { name, description },
      { new: true, runValidators: true }
    );

    if (!updatedCountry) {
      throw new Error(`Cannot update a country with an id ${id}`);
    }

    return updatedCountry;
  }

  /**
   * Finds country photos.
   */
  static async getPhotos(
    id: Types.ObjectId,
    models: Context['models']
  ): Promise<PhotoDoc[]> {
    return models.Photo.find({ country: id });
  }
}
