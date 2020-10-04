import React from 'react';
import { useApolloClient } from 'react-apollo';

function ButtonLogout() {
  // Use apollo store.
  const client = useApolloClient();

  return (
    <button
      id="logout-button"
      className="button logout-button"
      onClick={async () => {
        // Remove auth token from browser localStorage.
        localStorage.removeItem('token');
        // Reset apollo store to rerender react components.
        await client.resetStore();
        console.log('Logged out!');
      }}
    >
      Logout
    </button>
  );
}

export default ButtonLogout;
