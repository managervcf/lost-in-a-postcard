import { Types } from 'mongoose';
import { Country, Photo } from '../models';
import {
  UpdateCountryArgs,
  CountryDoc,
  PhotoDoc,
  CountryModel,
  PhotoModel,
} from '../types';

class CountryService {
  constructor(
    private countryModel: CountryModel,
    private photoModel: PhotoModel
  ) {}
  /**
   * Finds all countries.
   */
  async getCountries(): Promise<CountryDoc[]> {
    return this.countryModel.find({});
  }

  /**
   * Searches for a country with a specific name.
   */
  async getCountry(name: string): Promise<CountryDoc> {
    const foundCountry = await this.countryModel.findOne({ name });

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
  async updateCountry({
    id,
    name,
    description,
  }: UpdateCountryArgs): Promise<CountryDoc> {
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

    const updatedCountry = await this.countryModel.findByIdAndUpdate(
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
  async getPhotos(id: Types.ObjectId): Promise<PhotoDoc[]> {
    return this.photoModel.find({ country: id });
  }
}

export const countryService = new CountryService(Country, Photo);
