import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import { useQuery } from 'react-apollo';
import CountryFormEdit from './CountryFormEdit';
import ButtonLogout from './ButtonLogout';
import PhotoFormNew from './PhotoFormNew';
import { ME } from '../graphql/queries';

function Dashboard() {
  const [showPhotoFormNew, setShowPhotoFormNew] = useState(false);
  const [showCountryEditForm, setShowCountryEditForm] = useState(false);

  // Query for user with additional option.
  const { loading, error, data } = useQuery(ME, {
    fetchPolicy: 'network-only',
  });

  // Handle loading, error and no user state.
  if (loading) return null;
  else if (error) return null;
  else if (!data.me) return null;

  // Destructure username.
  const { username } = data.me;

  return (
    <div className="dashboard">
      <div id="user-info">
        <p>
          <span>
            Logged in as <strong>{username}</strong>
          </span>
        </p>
        <Route component={ButtonLogout} />
      </div>
      <div className="dashboard-features">
        <div id="add-photo">
          <button
            id="add-photo-button"
            className="button"
            onClick={() => setShowPhotoFormNew(!showPhotoFormNew)}
          >
            {!showPhotoFormNew ? 'Add Photo' : 'Close'}
          </button>
          {showPhotoFormNew && <Route component={PhotoFormNew} />}
        </div>
        <div id="edit-countries">
          <button
            id="edit-countries-button"
            className="button"
            onClick={() => setShowCountryEditForm(!showCountryEditForm)}
          >
            {!showCountryEditForm ? 'Edit Countries' : 'Close'}
          </button>
          {showCountryEditForm && <Route component={CountryFormEdit} />}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
