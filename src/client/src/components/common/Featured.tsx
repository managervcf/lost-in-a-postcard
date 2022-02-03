import { useMutation } from '@apollo/react-hooks';
import { Star, StarBorder } from '@mui/icons-material';
import { Alert, IconButton, Snackbar, Switch } from '@mui/material';
import { useState } from 'react';
import { FETCH_LIMIT } from '../../constants';
import { PHOTOS, UpdatePhotoData, UpdatePhotoVars, UPDATE_PHOTO } from '../../graphql';

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
  const [updateMutation, { loading }] = useMutation<UpdatePhotoData, UpdatePhotoVars>(
    UPDATE_PHOTO,
    {
      refetchQueries: [{ query: PHOTOS, variables: { limit: FETCH_LIMIT } }],
      awaitRefetchQueries: true,
      onCompleted: () => handleClick(),
    }
  );

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
          disabled={loading}
          onChange={e => {
            setChecked(e.target.checked);
            updateMutation({ variables: { id, featured: e.target.checked } });
          }}
        />
      )}
    </>
  );
};
