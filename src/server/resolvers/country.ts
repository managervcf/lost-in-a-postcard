import { isAuthorized } from '../utils';
import { Resolvers, CountryDoc } from '../types';
import { CountryService } from '../services';

// Create and immediately export resolvers.
export const countryResolvers: Resolvers<CountryDoc> = {
  Query: {
    countries: CountryService.countries,
    country: CountryService.country,
  },

  Mutation: {
    updateCountry: isAuthorized(CountryService.updateCountry),
  },

  Country: {
    photos: CountryService.photos,
    createdAt: ({ createdAt }, args, context) => createdAt.toString(),
    updatedAt: ({ updatedAt }, args, context) => updatedAt.toString(),
  },
};
