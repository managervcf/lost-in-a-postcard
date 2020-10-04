import React from 'react';
import { useApolloClient } from 'react-apollo';

function ButtonDelete({ editMode, setEditMode }) {
  // Access apollo store.
  const client = useApolloClient();

  // Pull logged user out of apollo store.
  const { me } = client.cache.data.data.ROOT_QUERY;

  // If there is no user logged in, display nothing.
  if (!me) return null;

  return (
    <button
      className="button edit-photo-button"
      onClick={() => setEditMode(!editMode)}
    >
      {editMode ? 'Exit editing' : 'Edit'}
    </button>
  );
}

export default ButtonDelete;
