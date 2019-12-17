import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import { Query } from 'react-apollo';

import LogoutButton from './LogoutButton';
import PhotoFormNew from './PhotoFormNew';
import CountryFormEdit from './CountryFormEdit';
import Frame from './Frame';

import { ME } from '../graphql/queries';

const Dashboard = () => {
  let [showPhotoFormNew, setShowPhotoFormNew] = useState(false);
  let [showCountryEditForm, setShowCountryEditForm] = useState(false);

  return (
    <Query query={ME} fetchPolicy="network-only">
      {({ loading, error, data }) => {
        if (loading) return null;
        if (error) return null;
        if (!data.me) return null;
        console.log('Currently logged in user:', data.me.username);
        return (
          <div className="dashboard">
            <div className="user-info">
              <p>
                <span>Logged in as </span>
                <strong>{data.me.username} </strong>
              </p>
              <Route component={LogoutButton} />
            </div>
            <Frame>
              <button onClick={() => setShowPhotoFormNew(!showPhotoFormNew)}>
                {!showPhotoFormNew ? 'Add Photo' : 'Close'}
              </button>
              {showPhotoFormNew && <Route component={PhotoFormNew} />}
            </Frame>
            <Frame>
              <button
                onClick={() => setShowCountryEditForm(!showCountryEditForm)}
              >
                {!showCountryEditForm ? 'Edit Countries' : 'Close'}
              </button>
              {showCountryEditForm && <Route component={CountryFormEdit} />}
            </Frame>
          </div>
        );
      }}
    </Query>
  );
};

export default Dashboard;
