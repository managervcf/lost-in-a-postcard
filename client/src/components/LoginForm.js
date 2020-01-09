import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

const LoginForm = ({ mutate, loading }) => {
  // Access history.
  const history = useHistory();

  let [login, setLogin] = useState('');
  let [password, setPassword] = useState('');

  return (
    <form
      className="login-form"
      onSubmit={e => {
        e.preventDefault();
        mutate({ variables: { login, password } });
        setLogin('');
        setPassword('');
      }}
    >
      <input
        required
        type="text"
        placeholder="Login"
        value={login}
        onChange={e => setLogin(e.target.value)}
        autoFocus
      />
      <input
        required
        placeholder="Password"
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <div className="login-buttons">
        <button type="submit" disabled={loading}>
          {!loading ? 'Login' : 'Logging in...'}
        </button>
        <button onClick={() => history.push('/photos')}>Back</button>
      </div>
    </form>
  );
};

export default LoginForm;