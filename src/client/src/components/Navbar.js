import React from 'react';
import { Query } from 'react-apollo';
import NavbarItem from './NavbarItem';
import { COUNTRIES } from '../graphql/queries';

const Navbar = () => (
	<Query query={COUNTRIES}>
		{({ data, loading, error }) => {
			if (error) return null;
			if (loading) return null;
			let navLinks = data.countries
				.sort()
				.map(({ id, name }) => (
					<NavbarItem key={id} countryName={name} />
				));

			return <nav className="navbar">{navLinks}</nav>;
		}}
	</Query>
);

export default Navbar;
