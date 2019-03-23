import React, { useState } from 'react';
import { withRouter } from 'react-router-dom';
import LoaderInline from './LoaderInline';

const LoginForm = ({ history, mutate, loading }) => {
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
					{!loading ? 'Login' : <LoaderInline size={10} loading={loading} />}
				</button>
				<button onClick={() => history.push('/photos')}>Back</button>
			</div>
		</form>
	);
};

export default withRouter(LoginForm);
