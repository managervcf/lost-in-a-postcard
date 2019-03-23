import React from 'react';
import { Mutation, withApollo } from 'react-apollo';
import { withRouter } from 'react-router-dom';

import LoginForm from './LoginForm';
import { LOGIN } from '../graphql/mutations';
import { ME } from '../graphql/queries';

const Login = ({ client, history }) => (
	<Mutation
		mutation={LOGIN}
		onCompleted={async ({ logIn }) => {
			// Insert token into browser localStorage.
			localStorage.setItem('token', logIn.token);
			// Reset apollo store to rerender react components.
			await client.resetStore();
			console.log('logged in!');
			history.push('/photos');
		}}
		refetchQueries={async () => await [{ query: ME }]}
	>
		{(mutate, { loading, error, data }) => {
			// if (error) return <p>{error.message} :(</p>;
			return <LoginForm mutate={mutate} loading={loading} />;
		}}
	</Mutation>
);

export default withRouter(withApollo(Login));
