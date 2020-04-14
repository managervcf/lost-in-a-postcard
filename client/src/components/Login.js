import React from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from 'react-apollo';
import LoginForm from './LoginForm';
import { LOGIN } from '../graphql/mutations';
import { ME } from '../graphql/queries';

function Login() {
  // Get history.
  const history = useHistory();

  // Login mutation.
  const [logIn, { loading, error, client }] = useMutation(LOGIN, {
    onCompleted: async ({ logIn }) => {
      // Insert token into browser localStorage.
      localStorage.setItem('token', logIn.token);
      // Reset apollo store to rerender react components.
      await client.resetStore();
      console.log('Logged in!');
      // Move to main photo page.
      history.push('/photos');
    },
    refetchQueries: () => [{ query: ME }],
    // Refetch queries, then mutate.
    awaitRefetchQueries: true,
  });

  // Error handler
  if (error) return <p>{error.message} :(</p>;
  return <LoginForm mutate={logIn} loading={loading} />;
}

export default Login;
