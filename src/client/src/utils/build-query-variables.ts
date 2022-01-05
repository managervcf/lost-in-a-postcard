import { PathMatch } from 'react-router-dom';
import { FETCH_LIMIT } from '../constants';
import { PhotosVars } from '../graphql';

/**
 * Helper function that builds query variables for photo query.
 * 1. Define base `queryVariables`.
 * 2. Check if there is match object present, if not, return `queryVariables`.
 * 3. Destructure properties off match object.
 * 4. Edit `queryVariables` based on the `pathname`, `country`, `featured` properties.
 */

export function buildQueryVars(match: PathMatch | null = null): Partial<PhotosVars> {
  const queryVariables: Partial<PhotosVars> = {
    limit: FETCH_LIMIT,
    featured: false,
    country: undefined,
  };

  if (!match) {
    return queryVariables;
  }

  const { country, '*': featured } = match.params;

  if (featured === 'featured') {
    queryVariables.featured = true;
  }

  if (country && country !== 'all') {
    queryVariables.country = country.replaceAll('-', ' ');
  }

  return queryVariables;
}
