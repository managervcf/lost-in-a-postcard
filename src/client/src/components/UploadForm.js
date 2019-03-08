import React, { useState } from 'react';
import { Mutation } from 'react-apollo';

import ADD_PHOTO from '../queries/ADD_PHOTO';

const UploadForm = () => {
	// Define country state variable.
	const [country, setCountry] = useState('');
	const [file, setFile] = useState({});

	const handleSubmit = (event, callback) => {
		event.preventDefault();
		console.dir('Sent a post request with new photo/file below:');
		console.dir(file);
		return callback({ variables: { file, country } });
	};

	return (
		<Mutation mutation={ADD_PHOTO}>
			{mutate => (
				<form onSubmit={event => handleSubmit(event, mutate)}>
					<input
						type="text"
						required
						value={country}
						onChange={event => setCountry(event.target.value)}
					/>
					<input
						type="file"
						required
						value={file.filename}
						onChange={event => setFile(event.target.files[0])}
					/>
					<button type="submit">Send!</button>
				</form>
			)}
		</Mutation>
	);
};

export default UploadForm;
