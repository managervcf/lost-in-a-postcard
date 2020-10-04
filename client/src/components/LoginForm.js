import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Errors from './Errors';

function LoginForm({ mutate, loading, error }) {
  // Access history.
  const history = useHistory();

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    mutate({ variables: { login, password } });
    setLogin('');
    setPassword('');
  };

  return (
    <form className="form" onSubmit={onSubmit}>
      <Errors error={error} />
      <input
        id="login-username-input"
        type="text"
        placeholder="Login"
        value={login}
        onChange={e => setLogin(e.target.value)}
        autoFocus
      />
      <input
        id="login-password-input"
        placeholder="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
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
