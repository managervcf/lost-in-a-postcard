import React from 'react';
import { useMutation } from 'react-apollo';
import { DELETE_PHOTO } from '../graphql';
import Errors from './Errors';

function DeleteButton({ id }) {
  const [deletePhoto, { loading, error, client }] = useMutation(DELETE_PHOTO, {
    variables: { id },
    onCompleted: () => client.resetStore(),
  });

  if (error) return <Errors error={error} />;

  return (
    <button
      className="button danger edit-photo-delete-button"
      disabled={loading}
      onClick={async () => await deletePhoto()}
    >
      {loading ? 'Deleting...' : 'Delete'}
    </button>
  );
}

export default DeleteButton;
