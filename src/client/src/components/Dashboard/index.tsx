import { Grid } from '@mui/material';
import { useState } from 'react';
import { Authenticated, Button, Modal } from '../common';
import { UserInfo } from '../Header/UserInfo';
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
        <UserInfo />
        <PhotoTable />
      </Authenticated>
      <Modal
        title="Add a new photograph"
        isOpen={showAddPhotoForm}
        toggle={setShowAddPhotoForm}
      >
        <AddPhotoForm />
      </Modal>
      <Modal
        title="Edit existing countries"
        isOpen={showEditCountriesForm}
        toggle={setShowEditCountriesForm}
      >
        <EditCountriesForm />
      </Modal>
    </Grid>
  );
}
