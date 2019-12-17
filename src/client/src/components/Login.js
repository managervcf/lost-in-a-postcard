import React from 'react';
import { withRouter } from 'react-router-dom';
import { useMutation } from 'react-apollo';

import LoginForm from './LoginForm';

import { LOGIN } from '../graphql/mutations';
import { ME } from '../graphql/queries';

const Login = ({ history }) => {
  const [login, { loading, error, client }] = useMutation(LOGIN, {
    onCompleted: async ({ logIn }) => {
      // Insert token into browser localStorage.
      localStorage.setItem('token', logIn.token);
      // Reset apollo store to rerender react components.
      await client.resetStore();
      console.log('Logged in!');
      history.push('/photos');
    },
    refetchQueries: () => [{ query: ME }],
    // Refetch queries, then mutate.
    awaitRefetchQueries: true
  });

  // Error handler
  if (error) return <p>{error.message} :(</p>;
  return <LoginForm mutate={login} loading={loading} />;
};

export default withRouter(Login);
