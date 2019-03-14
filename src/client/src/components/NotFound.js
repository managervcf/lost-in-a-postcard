import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => (
	<div>
		<p>Oops! Page you are looking for does not exist</p>
		<Link to="/">Click here to return to the main page.</Link>
	</div>
);

export default NotFound;
