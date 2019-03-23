import React from 'react';
import { withApollo } from 'react-apollo';

const LogoutButton = ({ history, client }) => (
	<button
		className="logout-button"
		onClick={async () => {
			// Remove auth token from browser localStorage.
			localStorage.clear();
			// Reset apollo store to rerender react components.
			await client.resetStore();
			console.log('logged out!');
			// history.push('/login');
		}}
	>
		Logout
	</button>
);

export default withApollo(LogoutButton);
