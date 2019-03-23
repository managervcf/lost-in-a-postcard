import React, { useState } from 'react';
import { Mutation, withApollo } from 'react-apollo';

import LoaderInline from './LoaderInline';
import withLoader from '../wrappers/withLoader';
import { EDIT_PHOTO } from '../graphql/mutations';
import { PHOTOS } from '../graphql/queries';

const PhotoFormEdit = props => {
	let { id, country, caption, featured, author, client } = props;
	let [editedCaption, setEditedCaption] = useState(caption);
	let [editedFeatured, setEditedFeatured] = useState(featured);

	let handleSubmit = async (e, mutate) => {
		e.preventDefault();
		await mutate({
			variables: {
				id,
				caption: editedCaption,
				featured: editedFeatured
			}
		});
	};

	return (
		<Mutation
			mutation={EDIT_PHOTO}
			onCompleted={async () => await client.resetStore()}
			refetchQueries={async () => await [{ query: PHOTOS }]}
		>
			{(updateMutation, { error, loading }) => {
				if (error) return <p>{error.message}</p>;
				if (loading) return <LoaderInline size={5} loading={loading} />;

				return (
					<form
						className="photo-edit-form"
						onSubmit={e => handleSubmit(e, updateMutation)}
					>
						<p>
							Photo from {country.name} by {author.username}
						</p>
						<input
							type="text"
							placeholder={caption}
							value={editedCaption}
							onChange={e => setEditedCaption(e.target.value)}
						/>
						<label>Photo is{featured ? ' ' : ' not '}featured</label>
						<input
							type="checkbox"
							checked={editedFeatured}
							onChange={e => setEditedFeatured(e.target.checked)}
						/>
						<button type="sumbit" disabled={loading}>
							{loading ? 'Loading...' : 'Update'}
						</button>
					</form>
				);
			}}
		</Mutation>
	);
};

export default withLoader(withApollo(PhotoFormEdit));
