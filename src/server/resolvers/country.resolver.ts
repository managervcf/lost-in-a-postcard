import { isAuthorized } from '../utils';
import { countryService } from '../services';
import { Resolvers, CountryDoc, UpdateCountryArgs } from '../types';

// Create and immediately export resolvers.
export const countryResolvers: Resolvers<CountryDoc> = {
  Query: {
    countries: (parent, args, context) => countryService.getCountries(),
    country: (parent, { name }: { name: string }, context) =>
      countryService.getCountry(name),
  },

  Mutation: {
    updateCountry: isAuthorized((parent, args: UpdateCountryArgs, context) =>
      countryService.updateCountry(args)
    ),
  },

  Country: {
    photos: ({ id }, args, context) => countryService.getPhotos(id),
    createdAt: ({ createdAt }, args, context) => createdAt.toString(),
    updatedAt: ({ updatedAt }, args, context) => updatedAt.toString(),
  },
};
