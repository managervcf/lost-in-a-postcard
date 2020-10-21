import { UpdateCountryArgs, CountryDoc, FieldResolver } from '../types';

export class CountryService {
  /**
   * Finds all countries.
   */
  static countries: FieldResolver<CountryDoc> = async (
    parent,
    args,
    { models }
  ) => await models.Country.find({});

  /**
   * Searches for a country with a specific name.
   */
  static country: FieldResolver<CountryDoc, { name: string }> = async (
    parent,
    { name },
    { models }
  ) => await models.Country.findOne({ name });

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
  ): Promise<CountryDoc | null> => {
    if (!id) {
      throw new Error('Must provide a country id');
    }
    if (!name) {
      throw new Error('Must provide a country name');
    }
    if (name.length < 3) {
      throw new Error('Country name must contain at least 3 characters.');
    }

    const updatedCountry = await models.Country.findByIdAndUpdate(
      id,
      { name, description },
      { new: true, runValidators: true }
    );
    return updatedCountry;
  };

  /**
   * Finds country photos.
   */
  static photos: FieldResolver<CountryDoc> = async ({ id }, args, { models }) =>
    await models.Country.find({ country: id });
}
