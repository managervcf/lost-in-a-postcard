import React, { ChangeEvent, FormEvent, useState } from 'react';
import { useMutation, useApolloClient } from 'react-apollo';
import { DeleteButton } from './DeleteButton';
import { Button, Error } from '../common';
import { UpdatePhotoData, UpdatePhotoVars, UPDATE_PHOTO } from '../../graphql';
import { FormControlLabel, Grid, Switch, TextField, Typography } from '@mui/material';

interface PhotoEditFormProps {
  id: string;
  country: {
    name: string;
  };
  region: string;
  caption: string;
  featured: boolean;
  closeEditMode: () => void;
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
  closeEditMode,
}) => {
  const [editedPhoto, setEditedPhoto] = useState<EditedPhotoState>({
    id,
    region,
    caption,
    featured,
  });

  const client = useApolloClient();

  // Use mutation hook.
  const [updateMutation, { error, loading }] = useMutation<
    UpdatePhotoData,
    UpdatePhotoVars
  >(UPDATE_PHOTO, { onCompleted: client.resetStore });

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
    closeEditMode();
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
    <Grid
      container
      spacing={2}
      component="form"
      onSubmit={handleSubmit}
      justifyContent="center"
      flexDirection="column"
    >
      <Grid item>
        <Typography variant="h6">Edit photo</Typography>
      </Grid>
      <Grid item>
        <TextField
          id="edit-photo-country-input"
          name="country"
          type="text"
          label={'Country: ' + country.name}
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
        <Button id="edit-photo-submit-button" submit loading={loading}>
          Update
        </Button>
        <DeleteButton id={id} />
      </Grid>
    </Grid>
  );
};
