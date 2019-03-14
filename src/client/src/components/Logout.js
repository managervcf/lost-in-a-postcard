import React from 'react';

const Logout = ({ history }) => {
	const handleClick = () => {
		localStorage.setItem('token', null);
		console.log('localStorage', localStorage);
		history.push('/');
	};
	return <button onClick={handleClick}>Logout</button>;
};

export default Logout;
