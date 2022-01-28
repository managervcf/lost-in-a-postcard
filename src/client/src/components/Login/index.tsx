import { useMutation } from 'react-apollo';
import { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Error, Form } from '../common';
import { LOGIN, LoginData, LoginVars } from '../../graphql';
import { Grid, TextField } from '@mui/material';

interface CredentialsState {
  login: string;
  password: string;
}

export const Login = () => {
  const navigate = useNavigate();

  /**
   * Login mutation.
   * On completed mutation:
   * 1. Set the token on the localStorage.
   * 2. Reset the Apollo store.
   * 3. Return to the /photos route.
   */
  const [logIn, { loading, error, client }] = useMutation<LoginData, LoginVars>(LOGIN, {
    onCompleted: async ({ logIn }) => {
      localStorage.setItem('token', logIn.token);
      await client?.resetStore();
      navigate('/photos');
    },
  });

  const [credentials, setCredentials] = useState<CredentialsState>({
    login: '',
    password: '',
  });

  /**
   * Handles the form submit event.
   * 1. Prevent the page refresh.
   * 2. Issue the logIn mutation.
   * 3. Reset the login and password state variables.
   */
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    logIn({ variables: credentials });
    setCredentials({ login: '', password: '' });
  };

  return (
    <Form id="login-form" onSubmit={handleSubmit}>
      <Grid item>
        <Error error={error} />
      </Grid>
      <Grid item>
        <TextField
          id="login-username-input"
          value={credentials.login}
          type="text"
          required
          label="Username"
          onChange={e => setCredentials({ ...credentials, login: e.target.value })}
          autoFocus
        />
      </Grid>
      <Grid item>
        <TextField
          id="login-password-input"
          value={credentials.password}
          type="password"
          required
          label="Password"
          onChange={e => setCredentials({ ...credentials, password: e.target.value })}
        />
      </Grid>
      <Grid item>
        <Button id="login-submit-button" submit variant="contained" loading={loading}>
          Login
        </Button>
        <Button id="login-back-button" onClick={() => navigate('/photos/all/featured')}>
          Back
        </Button>
      </Grid>
    </Form>
  );
};
