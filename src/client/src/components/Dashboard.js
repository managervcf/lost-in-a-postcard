import React, { useState } from 'react';
import { Route } from 'react-router-dom';
import { Query } from 'react-apollo';

import LogoutButton from './LogoutButton';
import PhotoFormNew from './PhotoFormNew';
import CountryFormEdit from './CountryFormEdit';
import { ME } from '../graphql/queries';

const Dashboard = () => {
	let [isVisible, setIsVisible] = useState(false);
	let [showPhotoFormNew, setShowPhotoFormNew] = useState(false);
	let [showCountryEditForm, setShowCountryEditForm] = useState(false);

	return (
		<Query query={ME} fetchPolicy="network-only">
			{({ loading, error, data }) => {
				if (loading) return null;
				if (error) return null;
				if (!data.me) return null;
				console.log(data.me);
				return (
					<div className="dashboard">
						<div className="user-info">
							<p>
								<span>Logged in as </span>
								<strong>{data.me.username} </strong>
								<span>({data.me.email})</span>
							</p>
							<Route component={LogoutButton} />
						</div>
						<button onClick={() => setShowPhotoFormNew(!showPhotoFormNew)}>
							{!showPhotoFormNew ? 'Add Photo' : 'Close'}
						</button>
						{showPhotoFormNew && <Route component={PhotoFormNew} />}
						<button
							onClick={() => setShowCountryEditForm(!showCountryEditForm)}
						>
							{!showCountryEditForm ? 'Edit Countries' : 'Close'}
						</button>
						{showCountryEditForm && <Route component={CountryFormEdit} />}
					</div>
				);
			}}
		</Query>
	);
};

export default Dashboard;
