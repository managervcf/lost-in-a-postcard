import React from 'react';

/**
 * A component responsible for displaying errors
 * received from the graphQL API.
 * @param {{ error: ApolloError }} props
 */
function Errors({ error }) {
  return error ? <div className="error">{error.message}</div> : null;
}

export default Errors;
