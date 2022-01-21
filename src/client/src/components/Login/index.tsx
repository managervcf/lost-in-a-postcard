import { useMutation } from 'react-apollo';
import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Error } from '../common';
import { LOGIN, LoginData, LoginVars } from '../../graphql';

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
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    logIn({ variables: credentials });
    setCredentials({ login: '', password: '' });
  };

  return (
    <form className="form" onSubmit={handleSubmit}>
      <Error error={error} />
      <input
        id="login-username-input"
        type="text"
        placeholder="Login"
        value={credentials.login}
        onChange={e => setCredentials({ ...credentials, login: e.target.value })}
        autoFocus
      />
      <input
        id="login-password-input"
        placeholder="Password"
        type="password"
        value={credentials.password}
        onChange={e => setCredentials({ ...credentials, password: e.target.value })}
      />
      <div className="login-buttons">
        <button
          id="login-submit-button"
          className="button"
          type="submit"
          disabled={loading}
        >
          {!loading ? 'Login' : 'Logging in...'}
        </button>
        <button
          id="login-back-button"
          className="button"
          onClick={() => navigate('/photos/all/featured')}
        >
          Back
        </button>
      </div>
    </form>
  );
};
