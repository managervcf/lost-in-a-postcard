import React from 'react';
import { useMutation } from 'react-apollo';
import { DeletePhotoData, DeletePhotoVars, DELETE_PHOTO } from '../../graphql';
import { Button, Error } from '../common';

interface DeleteButtonProps {
  id: string;
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({ id }) => {
  const [deletePhoto, { loading, error }] = useMutation<DeletePhotoData, DeletePhotoVars>(
    DELETE_PHOTO,
    { variables: { id } }
  );

  if (error) {
    return <Error error={error} />;
  }

  return (
    <Button color="error" onClick={deletePhoto} loading={loading}>
      Delete
    </Button>
  );
};
