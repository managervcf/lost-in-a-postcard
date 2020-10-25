import React from 'react';
import { useMutation } from 'react-apollo';
import { DeletePhotoData, DeletePhotoVars, DELETE_PHOTO } from '../../graphql';
import Error from '../common/Error';

interface DeleteButtonProps {
  id: string;
}

function DeleteButton({ id }: DeleteButtonProps) {
  const [deletePhoto, { loading, error, client }] = useMutation<
    DeletePhotoData,
    DeletePhotoVars
  >(DELETE_PHOTO, {
    variables: { id },
    onCompleted: () => client?.resetStore(),
  });

  if (error) return <Error error={error} />;

  return (
    <button
      className="button edit-photo-delete-button u-danger"
      disabled={loading}
      onClick={async () => await deletePhoto()}
    >
      {loading ? 'Deleting...' : 'Delete'}
    </button>
  );
}

export default DeleteButton;
