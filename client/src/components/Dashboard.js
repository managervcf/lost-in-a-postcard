import React, { useState } from 'react';
import { useQuery } from 'react-apollo';
import Errors from './Errors';
import CountryFormEdit from './CountryFormEdit';
import ButtonLogout from './ButtonLogout';
import PhotoFormNew from './PhotoFormNew';
import { ME } from '../graphql';

function Dashboard() {
  const [showPhotoFormNew, setShowPhotoFormNew] = useState(false);
  const [showCountryEditForm, setShowCountryEditForm] = useState(false);

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
      <div id="user-info">
        <p>
          <span>
            Logged in as <strong>{username}</strong>
          </span>
        </p>
        <ButtonLogout />
      </div>
      <div className="dashboard-features">
        <div id="add-photo">
          <button
            id="add-photo-button"
            className="button"
            onClick={() => {
              setShowPhotoFormNew(!showPhotoFormNew);
              setShowCountryEditForm(false);
            }}
          >
            {!showPhotoFormNew ? 'Add photo' : 'Close'}
          </button>
          {showPhotoFormNew && <PhotoFormNew />}
        </div>
        <div id="edit-countries">
          <button
            id="edit-countries-button"
            className="button"
            onClick={() => {
              setShowCountryEditForm(!showCountryEditForm);
              setShowPhotoFormNew(false);
            }}
          >
            {!showCountryEditForm ? 'Edit countries' : 'Close'}
          </button>
          {showCountryEditForm && <CountryFormEdit />}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
