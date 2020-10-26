import { ApolloError } from 'apollo-boost';
import React, { FormEvent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Error from '../common/Error';

interface LoginFormProps {
  mutate: Function;
  loading: boolean;
  error: ApolloError | undefined;
}

interface CredentialsState {
  login: string;
  password: string;
}

function LoginForm({ mutate, loading, error }: LoginFormProps) {
  const history = useHistory();

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
    mutate({ variables: credentials });
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
        onChange={e =>
          setCredentials({ ...credentials, login: e.target.value })
        }
        autoFocus
      />
      <input
        id="login-password-input"
        placeholder="Password"
        type="password"
        value={credentials.password}
        onChange={e =>
          setCredentials({ ...credentials, password: e.target.value })
        }
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
          onClick={() => history.push('/photos')}
        >
          Back
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
