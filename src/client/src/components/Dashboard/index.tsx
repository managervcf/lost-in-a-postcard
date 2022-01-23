import React, { useState } from 'react';
import { Authenticated, Button, Modal } from '../common';
import { AddPhotoForm } from './AddPhotoForm';
import { EditCountriesForm } from './EditCountriesForm';
import { PhotoList } from './PhotoList';

export function Dashboard() {
  const [showAddPhotoForm, setShowAddPhotoForm] = useState(false);
  const [showEditCountriesForm, setShowEditCountriesForm] = useState(false);

  return (
    <Authenticated>
      <Button
        id="add-photo-button"
        primary={showAddPhotoForm}
        onClick={() => {
          setShowAddPhotoForm(prev => !prev);
          setShowEditCountriesForm(false);
        }}
      >
        Add new photo
      </Button>
      <Button
        id="edit-countries-button"
        primary={showEditCountriesForm}
        onClick={() => {
          setShowEditCountriesForm(prev => !prev);
          setShowAddPhotoForm(false);
        }}
      >
        Edit countries
      </Button>
      <div className="dashboard">
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
      </div>
      <PhotoList />
    </Authenticated>
  );
}
