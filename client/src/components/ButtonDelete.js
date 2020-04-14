import React from 'react';
import { useMutation } from 'react-apollo';

import { DELETE_PHOTO } from '../graphql/mutations';
import { PHOTOS } from '../graphql/queries';

const DeleteButton = ({ id }) => {
  const [deletePhoto, { loading, error, client }] = useMutation(DELETE_PHOTO, {
    variables: { id },
    onCompleted: async () => await client.resetStore(),
    refetchQueries: async () => await [{ query: PHOTOS }],
  });

  // Check if user is logged in by checking the store.
  let { me } = client.cache.data.data.ROOT_QUERY;

  // Handle error and case where there is no user logged in.
  if (error) return <p>{error.message}</p>;
  if (!me) return null;

  return (
    <button disabled={loading} onClick={deletePhoto}>
      {loading ? 'Deleting...' : 'Delete'}
    </button>
  );
};

export default DeleteButton;
