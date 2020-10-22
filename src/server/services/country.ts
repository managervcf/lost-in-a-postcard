import {
  UpdateCountryArgs,
  CountryDoc,
  FieldResolver,
  PhotoDoc,
} from '../types';

export abstract class CountryService {
  /**
   * Finds all countries.
   */
  static countries: FieldResolver<CountryDoc> = async (
    parent,
    args,
    { models }
  ): Promise<CountryDoc[]> => await models.Country.find({});

  /**
   * Searches for a country with a specific name.
   */
  static country: FieldResolver<CountryDoc, { name: string }> = async (
    parent,
    { name },
    { models }
  ): Promise<CountryDoc> => {
    const foundCountry = await models.Country.findOne({ name });

    if (!foundCountry) {
      throw new Error(`Cannot find a country with a name ${name}`);
    }

    return foundCountry;
  };

  /**
   * Updates the country record.
   * 1. Perform validation checks.
   * 2. Update the record in the database.
   * 3. Return the updated record.
   */
  static updateCountry: FieldResolver<CountryDoc, UpdateCountryArgs> = async (
    parent,
    { id, name, description },
    { models }
  ): Promise<CountryDoc> => {
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
  };

  /**
   * Finds country photos.
   */
  static photos: FieldResolver<CountryDoc> = async (
    { id },
    args,
    { models }
  ): Promise<PhotoDoc[]> => await models.Photo.find({ country: id });
}
