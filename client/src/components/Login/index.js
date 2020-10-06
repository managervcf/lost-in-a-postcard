import React from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from 'react-apollo';
import LoginForm from './LoginForm';
import { LOGIN } from '../../graphql';

function Login() {
  const history = useHistory();

  /**
   * Login mutation.
   * On completed mutation:
   * 1. Set the token on the localStorage.
   * 2. Reset the Apollo store.
   * 3. Return to the /photos route.
   */
  const [logIn, { loading, error, client }] = useMutation(LOGIN, {
    onCompleted: async ({ logIn }) => {
      localStorage.setItem('token', logIn.token);
      await client.resetStore();
      history.push('/photos');
    },
  });

  return <LoginForm mutate={logIn} loading={loading} error={error} />;
}

export default Login;
