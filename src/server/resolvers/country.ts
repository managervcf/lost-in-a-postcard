import { isAuthorized } from '../utils';
import { Resolvers, CountryDoc, UpdateCountryArgs } from '../types';
import { CountryService } from '../services';

// Create and immediately export resolvers.
export const countryResolvers: Resolvers<CountryDoc> = {
  Query: {
    countries: (parent, args, { models }) =>
      CountryService.getCountries(models),
    country: (parent, { name }: { name: string }, { models }) =>
      CountryService.getCountry(name, models),
  },

  Mutation: {
    updateCountry: isAuthorized((parent, args: UpdateCountryArgs, { models }) =>
      CountryService.updateCountry(args, models)
    ),
  },

  Country: {
    photos: ({ id }, args, { models }) => CountryService.getPhotos(id, models),
    createdAt: ({ createdAt }, args, context) => createdAt.toString(),
    updatedAt: ({ updatedAt }, args, context) => updatedAt.toString(),
  },
};
