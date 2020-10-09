/**
 * Helper function that builds query variables for photo query.
 * 1. Initialize the query variables variable.
 * 2. If the match.isExact is true (/photos), return an empty object.
 * 3. If the pathname includes the /photos/featured, set the feature
 *    property on the variable object to true.
 * 4. Set the country property on the variables object to whatever else
 *    is left behind the /photos or /photos/featured.
 * 5. Return the query variables.
 * @param {object} location
 * @param {object} match
 * @returns {{ featured?: boolean, country?: string }}
 */
export function buildQueryVariables(location, match) {
  let queryVariables = {};

  if (!match.isExact) {
    const featuredPath = `${match.path}/featured`;

    if (location.pathname.includes(featuredPath)) {
      queryVariables.featured = true;
    }

    queryVariables.country = location.pathname
      .replace(`${match.path}/${queryVariables.featured ? 'featured' : ''}`, '')
      .replace('/', '')
      .toLowerCase();
  }

  return queryVariables;
}
