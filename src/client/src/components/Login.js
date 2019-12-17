import React from 'react';
import { withRouter } from 'react-router-dom';
import { useMutation, useApolloClient } from 'react-apollo';

import LoginForm from './LoginForm';

import { LOGIN } from '../graphql/mutations';
import { ME } from '../graphql/queries';

const Login = ({ history }) => {
  // Access apollo store.
  const client = useApolloClient();

  const [login, { loading, error }] = useMutation(LOGIN, {
    onCompleted: async ({ logIn }) => {
      // Insert token into browser localStorage.
      localStorage.setItem('token', logIn.token);
      // Reset apollo store to rerender react components.
      await client.resetStore();
      console.log('Logged in!');
      history.push('/photos');
    },
    refetchQueries: () => [{ query: ME }]
  });

  // Error handler
  if (error) return <p>{error.message} :(</p>;
  return <LoginForm mutate={login} loading={loading} />;
};

export default withRouter(Login);
