import React from 'react';
import { useMutation } from 'react-apollo';
import { FETCH_LIMIT } from '../../constants';
import {
  COUNTRIES,
  DeletePhotoData,
  DeletePhotoVars,
  DELETE_PHOTO,
  PHOTOS,
} from '../../graphql';
import { Button, Error } from '../common';

interface DeleteButtonProps {
  id: string;
}

export const DeleteButton: React.FC<DeleteButtonProps> = ({ id }) => {
  const [deletePhoto, { loading, error }] = useMutation<DeletePhotoData, DeletePhotoVars>(
    DELETE_PHOTO,
    {
      variables: { id },
      refetchQueries: [
        { query: PHOTOS, variables: { limit: FETCH_LIMIT } },
        { query: COUNTRIES },
      ],
    }
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
