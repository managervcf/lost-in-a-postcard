import React, { useState } from 'react';
import { Mutation } from 'react-apollo';

import ADD_PHOTO from '../graphql/mutations/addPhoto';

const UploadForm = ({ history }) => {
	// Define country state variable.
	const [country, setCountry] = useState('');
	const [caption, setCaption] = useState('');
	const [featured, setFeatured] = useState(false);
	const [file, setFile] = useState({});
	const [uploading, setUploading] = useState(false);

	const handleSubmit = async (e, callback) => {
		e.preventDefault();
		setUploading(true);
		await callback({ variables: { file, country, caption, featured } });
		await history.push('/');
		setUploading(false);
	};

	return (
		<div>
			<Mutation mutation={ADD_PHOTO}>
				{mutate => (
					<form onSubmit={e => handleSubmit(e, mutate)}>
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
							disabled={uploading}
							value={file.filename}
							onChange={e => setFile(e.target.files[0])}
						/>
						<button disabled={uploading} type="submit">
							{uploading ? 'Uploading...' : 'Send!'}
						</button>
					</form>
				)}
			</Mutation>
			<button onClick={history.goBack}>Go Back</button>
		</div>
	);
};

export default UploadForm;
