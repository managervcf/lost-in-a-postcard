import React from 'react';

function Errors({ error }) {
  return error ? (
    <div className="error">
      {error.graphQLErrors.map(({ message }) => message)}
    </div>
  ) : null;
}

export default Errors;
