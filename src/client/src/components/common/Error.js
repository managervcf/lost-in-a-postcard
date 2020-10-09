import React from 'react';

/**
 * A component responsible for displaying errors
 * received from the graphQL API.
 * @param {{ error?: { message: string }, text?: string }} props
 */
function Error({ error, text }) {
  const parsedError = error?.message
    .replace('GraphQL error: ', '')
    .replace('Network error: ', '');

  const isError = error || text;

  return isError ? (
    <div className="error">
      <div className="error-text">{text ?? parsedError}</div>
    </div>
  ) : null;
}

export default Error;
