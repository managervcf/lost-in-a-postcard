import React from 'react';
import { useApolloClient, useMutation } from 'react-apollo';
import { DeletePhotoData, DeletePhotoVars, DELETE_PHOTO } from '../../graphql';
import { Button, Error } from '../common';

interface DeleteButtonProps {
  id: string;
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({ id }) => {
  const client = useApolloClient();

  const [deletePhoto, { loading, error }] = useMutation<DeletePhotoData, DeletePhotoVars>(
    DELETE_PHOTO,
    {
      variables: { id },
      onCompleted: client.resetStore,
    }
  );

  if (error) return <Error error={error} />;

  return (
    <Button
      className="edit-photo-delete-button u-danger"
      onClick={deletePhoto}
      loading={loading}
    >
      Delete
    </Button>
  );
};
