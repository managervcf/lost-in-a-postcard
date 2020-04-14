import React from 'react';
import { useApolloClient } from 'react-apollo';

function ButtonLogout() {
  // Use apollo store.
  const client = useApolloClient();

  return (
    <button
      className="logout-button"
      onClick={async () => {
        // Remove auth token from browser localStorage.
        localStorage.clear();
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
