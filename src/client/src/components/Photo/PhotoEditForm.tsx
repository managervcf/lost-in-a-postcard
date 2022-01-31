import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useMutation } from 'react-apollo';
import { DeleteButton } from './DeleteButton';
import { Button, Error, Form } from '../common';
import { PHOTOS, UpdatePhotoData, UpdatePhotoVars, UPDATE_PHOTO } from '../../graphql';
import { FETCH_LIMIT, AWS_URL } from '../../constants';
import {
  Alert,
  Avatar,
  FormControlLabel,
  Grid,
  Snackbar,
  Stack,
  Switch,
  TextField,
  Typography,
} from '@mui/material';

interface PhotoEditFormProps {
  id: string;
  country: {
    name: string;
  };
  region: string;
  caption: string;
  featured: boolean;
  upload: {
    key: string;
  };
}

interface EditedPhotoState {
  id: string;
  region: string;
  caption: string;
  featured: boolean;
}

export const PhotoEditForm: React.FC<PhotoEditFormProps> = ({
  id,
  country,
  region,
  caption,
  featured,
  upload,
}) => {
  const [open, setOpen] = useState(false);
  const [editedPhoto, setEditedPhoto] = useState<EditedPhotoState>({
    id,
    region,
    caption,
    featured,
  });

  const handleClick = () => setOpen(true);

  const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  // Use mutation hook.
  const [updateMutation, { error, loading }] = useMutation<
    UpdatePhotoData,
    UpdatePhotoVars
  >(UPDATE_PHOTO, {
    refetchQueries: [{ query: PHOTOS, variables: { limit: FETCH_LIMIT } }],
  });

  /**
   * Handles the form submit event.
   * 1. Prevent the page refresh.
   * 2. Issue the editPhoto mutation.
   */
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await updateMutation({
      variables: editedPhoto,
    });
    // closeEditMode();
    handleClick();
  };

  /**
   * Handles on change events.
   * 1. Update the editedPhoto state variable
   *    with the changed input value.
   * @param {Event} e
   */
  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) =>
    setEditedPhoto({
      ...editedPhoto,
      [e.target.name]:
        e.target.type === 'text'
          ? e.target.value
          : e.target.type === 'checkbox'
          ? e.target.checked
          : null,
    });

  if (error) {
    return <Error error={error} />;
  }

  return (
    <Form onSubmit={handleSubmit}>
      <Snackbar open={open} autoHideDuration={3000} onClose={handleClose}>
        <Alert variant="filled" onClose={handleClose} severity="success">
          Photo edited
        </Alert>
      </Snackbar>
      <Grid item>
        <Stack direction="row" spacing={2}>
          <Typography variant="h6">Edit photo</Typography>
          <Avatar alt={country.name} srcSet={`${AWS_URL}${upload.key}`} />
        </Stack>
      </Grid>
      <Grid item>
        <TextField
          id="edit-photo-country-input"
          name="country"
          type="text"
          label="Country:"
          value={country.name}
          disabled
        />
      </Grid>
      <Grid item>
        <TextField
          id="edit-photo-region-input"
          name="region"
          type="text"
          label={'Region: ' + region}
          value={editedPhoto.region}
          onChange={handleInputChange}
          disabled={loading}
        />
      </Grid>
      <Grid item>
        <TextField
          id="edit-photo-caption-input"
          name="caption"
          type="text"
          label={'Caption: ' + caption}
          value={editedPhoto.caption}
          onChange={handleInputChange}
          disabled={loading}
        />
      </Grid>
      <Grid item>
        <FormControlLabel
          control={
            <Switch
              color="primary"
              name="featured"
              checked={editedPhoto.featured}
              onChange={handleInputChange}
            />
          }
          label="Featured"
          disabled={loading}
        />
      </Grid>
      <Grid item>
        <Button
          id="edit-photo-submit-button"
          submit
          variant="contained"
          loading={loading}
        >
          Update
        </Button>
        <DeleteButton id={id} />
      </Grid>
    </Form>
  );
};
