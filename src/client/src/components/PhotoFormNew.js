import React, { useState } from 'react';
import { Mutation, withApollo } from 'react-apollo';
import { withRouter } from 'react-router-dom';

import LoaderInline from './LoaderInline';
import { ADD_PHOTO } from '../graphql/mutations';
import { PHOTOS } from '../graphql/queries';

const PhotoFormNew = ({ history, client }) => {
	// Define country state variable.
	let [country, setCountry] = useState('');
	let [caption, setCaption] = useState('');
	let [featured, setFeatured] = useState(false);
	let [file, setFile] = useState({});

	let handleSubmit = async (e, mutate) => {
		e.preventDefault();
		await mutate({ variables: { file, country, caption, featured } });
	};

	return (
		<div>
			<Mutation
				mutation={ADD_PHOTO}
				onCompleted={async () => await client.resetStore()}
				refetchQueries={async () => await [{ query: PHOTOS }]}
			>
				{(uploadMutation, { error, loading }) => (
					<form
						className="upload-form"
						onSubmit={e => handleSubmit(e, uploadMutation)}
					>
						<input
							type="text"
							required
							placeholder="Country"
							value={country}
							onChange={e => setCountry(e.target.value)}
						/>
						<input
							type="text"
							placeholder="Caption"
							value={caption}
							onChange={e => setCaption(e.target.value)}
						/>
						<label>Featured?</label>
						<input
							type="checkbox"
							checked={featured}
							onChange={e => setFeatured(e.target.checked)}
						/>
						<input
							type="file"
							required
							disabled={loading}
							value={file ? file.filename : 'Pick a photo'}
							onChange={e => setFile(e.target.files[0])}
						/>
						<button disabled={loading} type="submit">
							{loading ? <LoaderInline loading={loading} size={15} /> : 'Send'}
						</button>
					</form>
				)}
			</Mutation>
		</div>
	);
};

export default withApollo(withRouter(PhotoFormNew));