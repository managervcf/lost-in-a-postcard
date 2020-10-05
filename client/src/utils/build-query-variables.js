/**
 * Helper function that builds query variables for photo query.
 * 1. If url match is not exact, pull out parameters.
 * 2. If url contains featured, add featured = true as a variable.
 * 3. If url is not exact and it is not featured, add as country.
 * @param {string} location
 * @param {string} match
 * @returns {object}
 */
export function buildQueryVariables(location, match) {
  let query = {};
  if (!match.isExact) {
    if (location.pathname === '/photos/featured') {
      query.featured = true;
    } else {
      query.country = location.pathname.replace(`${match.path}/`, '');
    }
  }
  return query;
}
