import { Dialog, DialogContent, Grid } from '@mui/material';
import { useState } from 'react';
import { Authenticated, Button } from '../common';
import { LogoutButton } from './LogoutButton';
import { AddPhotoForm } from './AddPhotoForm';
import { EditCountriesForm } from './EditCountriesForm';
import { PhotoTable } from './PhotoTable';

export function Dashboard() {
  const [showAddPhotoForm, setShowAddPhotoForm] = useState(false);
  const [showEditCountriesForm, setShowEditCountriesForm] = useState(false);

  return (
    <Grid container justifyContent="center">
      <Authenticated>
        <Button
          id="add-photo-button"
          onClick={() => {
            setShowAddPhotoForm(prev => !prev);
            setShowEditCountriesForm(false);
          }}
        >
          Add new photo
        </Button>
        <Button
          id="edit-countries-button"
          onClick={() => {
            setShowEditCountriesForm(prev => !prev);
            setShowAddPhotoForm(false);
          }}
        >
          Edit countries
        </Button>
        <LogoutButton />
        <PhotoTable />
      </Authenticated>
      <Dialog open={showAddPhotoForm} onClose={() => setShowAddPhotoForm(false)}>
        <DialogContent>
          <AddPhotoForm />
        </DialogContent>
      </Dialog>
      <Dialog
        open={showEditCountriesForm}
        onClose={() => setShowEditCountriesForm(false)}
      >
        <DialogContent>
          <EditCountriesForm />
        </DialogContent>
      </Dialog>
    </Grid>
  );
}
