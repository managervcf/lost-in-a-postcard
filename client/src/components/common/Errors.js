import React from 'react';

/**
 * A component responsible for displaying errors
 * received from the graphQL API.
 * @param {{ error: ApolloError, text: string }} props
 */
function Errors({ error, text }) {
  const parsedError = error?.message
    .replace('GraphQL error: ', '')
    .replace('Network error: ', '');

  return error || text ? (
    <div className="error">
      <div className="error-text">{text ?? parsedError}</div>
    </div>
  ) : null;
}

export default Errors;
