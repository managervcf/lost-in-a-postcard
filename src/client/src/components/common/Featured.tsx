import { useMutation } from '@apollo/react-hooks';
import { Star, StarBorder } from '@mui/icons-material';
import { Alert, IconButton, Snackbar, Switch } from '@mui/material';
import { useState } from 'react';
import {
  allPhotosQuery,
  PhotosData,
  PhotosVars,
  UpdatePhotoData,
  UpdatePhotoVars,
  UPDATE_PHOTO,
} from '../../graphql';

interface FeaturedProps {
  id: string;
  featured: boolean;
  label?: string;
  star?: boolean;
}

export const Featured: React.FC<FeaturedProps> = ({
  id,
  featured,
  label = '',
  star = false,
}) => {
  const [checked, setChecked] = useState(featured);
  const [open, setOpen] = useState(false);

  const handleClick = () => setOpen(true);
  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  // Use mutation hook.
  const [updateMutation] = useMutation<UpdatePhotoData, UpdatePhotoVars>(UPDATE_PHOTO, {
    onCompleted: () => handleClick(),
    update: (cache, { data }) => {
      const cachedData = cache.readQuery<PhotosData, PhotosVars>(allPhotosQuery);

      if (!cachedData || !data) {
        return;
      }

      const updatedDocs = cachedData.photos.docs.map(photo =>
        photo.id === data.updatePhoto.id
          ? { ...photo, featured: data.updatePhoto.featured }
          : photo
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
  });

  return (
    <>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert
          icon={checked ? <Star /> : <StarBorder />}
          variant="filled"
          onClose={handleClose}
          severity="success"
        >
          {checked ? 'Photo featured' : 'Photo removed from featured'}
        </Alert>
      </Snackbar>
      {star ? (
        <IconButton color="primary">{checked ? <Star /> : null}</IconButton>
      ) : (
        <Switch
          color="primary"
          name="featured"
          checked={featured}
          onChange={e => {
            setChecked(e.target.checked);
            updateMutation({ variables: { id, featured: e.target.checked } });
          }}
        />
      )}
    </>
  );
};
