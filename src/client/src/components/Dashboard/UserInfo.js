import React from 'react';
import LogoutButton from './LogoutButton';

function UserInfo({ username }) {
  return (
    <div id="user-info">
      <p>
        <span>
          Logged in as <strong>{username}</strong>
        </span>
      </p>
      <LogoutButton />
    </div>
  );
}

export default UserInfo;
