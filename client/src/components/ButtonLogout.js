import React from 'react';
import { useApolloClient } from 'react-apollo';

function ButtonLogout() {
  const client = useApolloClient();

  /**
   * Handles the logout button click event.
   * 1. Remove the token property from the localStorage.
   * 2. Reset the Apollo store to update the component.
   */
  const handleClick = async () => {
    localStorage.removeItem('token');
    await client.resetStore();
  };

  return (
    <button id="logout-button" className="button" onClick={handleClick}>
      Logout
    </button>
  );
}

export default ButtonLogout;
