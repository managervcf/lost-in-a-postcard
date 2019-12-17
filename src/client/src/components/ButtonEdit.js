import React from 'react';
import { useApolloClient } from 'react-apollo';

const ButtonDelete = ({ editMode, setEditMode }) => {
  // Access apollo store.
  const client = useApolloClient();
  
  // Pull logged user out of apollo store.
  let { me } = client.cache.data.data.ROOT_QUERY;

  // If there is no user logged in, display nothing.
  if (!me) return null;

  return (
    <button onClick={() => setEditMode(!editMode)}>
      {editMode ? 'Exit editing' : 'Edit'}
    </button>
  );
};

export default ButtonDelete;
