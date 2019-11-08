import React, { useState } from 'react';
import { Query, Mutation } from 'react-apollo';

import { COUNTRIES } from '../graphql/queries';
import { UPDATE_COUNTRY } from '../graphql/mutations';

import LoaderInline from './LoaderInline';

const CountryFormEdit = () => {
	let [editedCountry, setEditedCountry] = useState({
		id: '',
		name: '',
		description: ''
	});

	let handleSubmit = async (e, mutate) => {
		e.preventDefault();
		await mutate({ variables: editedCountry });
		setEditedCountry({ id: '', name: '', description: '' });
	};

	let handleSelect = (e, countryArray) => {
		let { id, name, description } = countryArray.find(
			({ name }) => name === e.target.value
		);
		setEditedCountry({ id, name, description });
	};

	let handleInputChange = e =>
		setEditedCountry({
			...editedCountry,
			[e.target.name]: e.target.value
		});

	return (
		<Query query={COUNTRIES}>
			{({ loading, error, data, client }) => {
				if (loading) return null;
				if (error) return null;
				let countryOptions = data.countries.sort().map(({ id, name }) => (
					<option key={id} value={name}>
						{name}
					</option>
				));

				return (
					<Mutation
						mutation={UPDATE_COUNTRY}
						onCompleted={async () => await client.resetStore()}
						refetchQueries={async () => await [{ query: COUNTRIES }]}
					>
						{(updateCountry, { loading, error }) => (
							<form onSubmit={e => handleSubmit(e, updateCountry)}>
								<select
									defaultValue={0}
									onChange={e => handleSelect(e, data.countries)}
								>
									<option value={0} disabled>
										--Country--
									</option>
									{countryOptions}
								</select>
								{editedCountry.name && (
									<input
										type="text"
										value={editedCountry.name}
										name="name"
										onChange={handleInputChange}
									/>
								)}
								{editedCountry.name && (
									<textarea
										value={editedCountry.description}
										name="description"
										onChange={handleInputChange}
									/>
								)}
								<button type="submit">
									{!loading ? (
										'Update'
									) : (
										<LoaderInline size={5} loading={loading} />
									)}
								</button>
							</form>
						)}
					</Mutation>
				);
			}}
		</Query>
	);
};

export default CountryFormEdit;