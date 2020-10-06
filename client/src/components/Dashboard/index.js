import React, { useState } from 'react';
import { useQuery } from 'react-apollo';
import Errors from '../common/Errors';
import EditCountriesForm from './EditCountriesForm';
import AddPhotoForm from './AddPhotoForm';
import { ME } from '../../graphql';
import UserInfo from './UserInfo';

function Dashboard() {
  const [showAddPhotoForm, setShowAddPhotoForm] = useState(false);
  const [showEditCountriesForm, setShowEditCountriesForm] = useState(false);

  const { loading, error, data } = useQuery(ME, {
    fetchPolicy: 'network-only',
  });

  // Handle loading, error and no user state.
  if (loading) return null;
  else if (error) return <Errors error={error} />;
  else if (!data.me) return null;

  // Destructure theusername.
  const { username } = data.me;

  return (
    <div className="dashboard">
      <UserInfo username={username} />
      <div className="dashboard-features">
        <div id="add-photo">
          <button
            id="add-photo-button"
            className="button"
            onClick={() => {
              setShowAddPhotoForm(!showAddPhotoForm);
              setShowEditCountriesForm(false);
            }}
          >
            {!showAddPhotoForm ? 'Add photo' : 'Close'}
          </button>
          {showAddPhotoForm && <AddPhotoForm />}
        </div>
        <div id="edit-countries">
          <button
            id="edit-countries-button"
            className="button"
            onClick={() => {
              setShowEditCountriesForm(!showEditCountriesForm);
              setShowAddPhotoForm(false);
            }}
          >
            {!showEditCountriesForm ? 'Edit countries' : 'Close'}
          </button>
          {showEditCountriesForm && <EditCountriesForm />}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
