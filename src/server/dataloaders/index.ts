import DataLoader from 'dataloader';
import { countryService } from '../services';
import { CountryDoc } from '../types';
import { Types } from 'mongoose';

/**
 * Set of dataloaders that help to reduce the amount of
 * data pulled from the database.
 */
export const dataloaders = {
  /**
   * Responsible to fetch all countries and load them in cache.
   */
  country: new DataLoader<Types.ObjectId, CountryDoc>(async countryIds => {
    // Get all countries from the database.
    const countries = await countryService.getCountries();

    // Map over all requested ids and compare them against the database data.
    return countryIds.map(
      countryId =>
        countries.find(country => countryId.equals(country.id)) ??
        new Error(`Country with an id: ${countryId} was not found`)
    );
  }),
};
