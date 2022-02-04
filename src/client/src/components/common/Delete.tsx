import { DeleteForever } from '@mui/icons-material';
import { Backdrop, CircularProgress, IconButton } from '@mui/material';
import { useMutation } from 'react-apollo';
import {
  allPhotosQuery,
  COUNTRIES,
  DeletePhotoData,
  DeletePhotoVars,
  DELETE_PHOTO,
  PhotosData,
  PhotosVars,
} from '../../graphql';
import { Button } from '.';

interface DeleteProps {
  id: string;
  trashIcon?: boolean;
  afterDelete?: () => void;
}

export const Delete: React.FC<DeleteProps> = ({ id, trashIcon = false, afterDelete }) => {
  const [deletePhoto, { loading }] = useMutation<DeletePhotoData, DeletePhotoVars>(
    DELETE_PHOTO,
    {
      variables: { id },
      refetchQueries: [{ query: COUNTRIES }],
      onCompleted: () => {
        if (afterDelete) {
          afterDelete();
        }
      },
      update: (cache, { data }) => {
        const cachedData = cache.readQuery<PhotosData, PhotosVars>(allPhotosQuery);

        if (!cachedData || !data) {
          return;
        }

        const updatedDocs = cachedData.photos.docs.filter(
          photo => photo.id !== data.deletePhoto.id
        );

        cache.writeQuery<PhotosData, PhotosVars>({
          ...allPhotosQuery,
          data: {
            photos: {
              ...cachedData.photos,
              docs: updatedDocs,
            },
          },
        });
      },
    }
  );

  return (
    <>
      <Backdrop sx={{ zIndex: 10 }} open={loading}>
        <CircularProgress color="primary" size={65} />
      </Backdrop>
      {trashIcon ? (
        <IconButton color="error" onClick={() => deletePhoto()} disabled={loading}>
          <DeleteForever />
        </IconButton>
      ) : (
        <Button color="error" onClick={() => deletePhoto()} loading={loading}>
          Delete
        </Button>
      )}
    </>
  );
};
