// Helper function that builds query variables for photo query.
export default (location, match) => {
  let query = {};
  // If url match is not exact, pull out parameters.
  if (!match.isExact) {
    // If url contains featured, add featured = true as a variable.
    if (location.pathname === '/photos/featured') {
      query.featured = true;
    } else {
      // If url is not exact and it is not featured, add as country.
      query.country = location.pathname.replace(`${match.path}/`, '');
    }
  }
  return query;
};
