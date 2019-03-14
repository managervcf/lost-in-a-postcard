import React from 'react';
import { Link } from 'react-router-dom';

import Logout from './Logout';

const LoggedUser = ({ me, history }) => (
	<div>
		<p>Logged in as {me.username}</p>
		<Logout history={history} />
		<button>
			<Link to="/new">Add New Photo</Link>
		</button>
	</div>
);

export default LoggedUser;
