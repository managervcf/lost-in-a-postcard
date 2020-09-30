import React from 'react';
import { useMutation } from 'react-apollo';
import { DELETE_PHOTO } from '../graphql/mutations';
import { PHOTOS } from '../graphql/queries';

function DeleteButton({ id }) {
  const [deletePhoto, { loading, error, client }] = useMutation(DELETE_PHOTO, {
    variables: { id },
    onCompleted: () => client.resetStore(),
    refetchQueries: () => [{ query: PHOTOS }],
  });

  // Check if user is logged in by checking the store.
  const { me } = client.cache.data.data.ROOT_QUERY;

  // Handle error and case where there is no user logged in.
  if (error) return <p>{error.message}</p>;
  if (!me) return null;

  return (
    <button
      className="button danger"
      disabled={loading}
      onClick={async () => await deletePhoto()}
    >
      {loading ? 'Deleting...' : 'Delete'}
    </button>
  );
}

export default DeleteButton;
