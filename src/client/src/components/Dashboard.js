import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import { useQuery } from 'react-apollo';

import CountryFormEdit from './CountryFormEdit';
import ButtonLogout from './ButtonLogout';
import PhotoFormNew from './PhotoFormNew';
import Frame from './Frame';

import { ME } from '../graphql/queries';

const Dashboard = () => {
  let [showPhotoFormNew, setShowPhotoFormNew] = useState(false);
  let [showCountryEditForm, setShowCountryEditForm] = useState(false);
  // Query for user with additional option.
  const { loading, error, data } = useQuery(ME, {
    fetchPolicy: 'network-only'
  });

  // Handle loading, error and no user state.
  if (loading) return null;
  else if (error) return null;
  else if (!data.me) return null;

  // Log user.
  console.log('Currently logged in user:', data.me.username);

  return (
    <div className="dashboard">
      <div className="user-info">
        <p>
          <span>Logged in as </span>
          <strong>{data.me.username} </strong>
        </p>
        <Route component={ButtonLogout} />
      </div>
      <Frame>
        <button onClick={() => setShowPhotoFormNew(!showPhotoFormNew)}>
          {!showPhotoFormNew ? 'Add Photo' : 'Close'}
        </button>
        {showPhotoFormNew && <Route component={PhotoFormNew} />}
      </Frame>
      <Frame>
        <button onClick={() => setShowCountryEditForm(!showCountryEditForm)}>
          {!showCountryEditForm ? 'Edit Countries' : 'Close'}
        </button>
        {showCountryEditForm && <Route component={CountryFormEdit} />}
      </Frame>
    </div>
  );
};

export default Dashboard;
