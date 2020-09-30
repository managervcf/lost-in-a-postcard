import React from 'react';
import { useHistory } from 'react-router-dom';
import { useMutation } from 'react-apollo';
import LoginForm from './LoginForm';
import { LOGIN } from '../graphql/mutations';
import { ME } from '../graphql/queries';

function Login() {
  const history = useHistory();

  /**
   * Login mutation. Await for queries to refetch first.
   * 1. Set the token on the localStorage after
   *    a successful mutation.
   * 2. Reset the store to update the component.
   * 3. Navigate to the /photos route.
   */
  const [logIn, { loading, error, client }] = useMutation(LOGIN, {
    onCompleted: async ({ logIn }) => {
      localStorage.setItem('token', logIn.token);
      await client.resetStore();
      console.log('Logged in!');
      history.push('/photos');
    },
    refetchQueries: () => [{ query: ME }],
    awaitRefetchQueries: true,
  });

  return <LoginForm mutate={logIn} loading={loading} error={error} />;
}

export default Login;
