import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Errors from './Errors';

function LoginForm({ logIn, loading, error }) {
  const history = useHistory();

  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');

  const onSubmit = e => {
    e.preventDefault();
    logIn({ variables: { login, password } });
  };

  return (
    <form className="form" onSubmit={onSubmit}>
      <Errors error={error} />
      <input
        type="text"
        placeholder="Login"
        value={login}
        onChange={e => setLogin(e.target.value)}
        autoFocus
      />
      <input
        placeholder="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <div className="login-buttons">
        <button className="button" type="submit" disabled={loading}>
          {!loading ? 'Login' : 'Logging in...'}
        </button>
        <button className="button" onClick={() => history.push('/photos')}>
          Back
        </button>
      </div>
    </form>
  );
}

export default LoginForm;
