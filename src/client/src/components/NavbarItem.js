import React from 'react';
import { NavLink } from 'react-router-dom';

import withLoader from '../wrappers/withLoader';

const NavbarItem = ({ countryName }) => (
	<NavLink
		className="navbar-item"
		activeStyle={{ fontWeight: 'bold' }}
		to={`/photos/${countryName}`}
	>
		{countryName}
	</NavLink>
);

export default withLoader(NavbarItem);
