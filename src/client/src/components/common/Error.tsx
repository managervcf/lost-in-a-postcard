import { ApolloError } from 'apollo-boost';
import React from 'react';

interface ErrorProps {
  error?: ApolloError | null;
  text?: string | null;
}

/**
 * A component responsible for displaying errors
 * received from the graphQL API.
 */
function Error({ error, text }: ErrorProps) {
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
