import React, { useState } from 'react';

const LoginForm = ({ history, mutate, data }) => {
	const [login, setLogin] = useState('');
	const [password, setPassword] = useState('');

	if (data) {
		localStorage.setItem('token', data.logIn.token);
		console.log('localStorage set to:', localStorage);
		history.push('/');
	}

	const handleSubmit = async (e, callback) => {
		e.preventDefault();
		await callback({ variables: { login, password } });
		setLogin('');
		setPassword('');
	};

	return (
		<form onSubmit={e => handleSubmit(e, mutate)}>
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
			<button type="submit">Login</button>
		</form>
	);
};

export default LoginForm;
