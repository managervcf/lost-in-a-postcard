import React from 'react';
import { useMutation } from 'react-apollo';
import { DeletePhotoData, DeletePhotoVars, DELETE_PHOTO } from '../../graphql';
import { Button, Error } from '../common';

interface DeleteButtonProps {
  id: string;
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({ id }) => {
  const [deletePhoto, { loading, error, client }] = useMutation<
    DeletePhotoData,
    DeletePhotoVars
  >(DELETE_PHOTO, {
    variables: { id },
    onCompleted: () => client?.resetStore(),
  });

  if (error) return <Error error={error} />;

  return (
    <Button
      className="edit-photo-delete-button u-danger"
      disabled={loading}
      onClick={async () => await deletePhoto()}
    >
      {loading ? 'Deleting...' : 'Delete'}
    </Button>
  );
};
