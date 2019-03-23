import React from 'react';
import { withApollo } from 'react-apollo';

const EditButton = ({ client, editMode, setEditMode }) => {
	let { me } = client.cache.data.data.ROOT_QUERY;

	return me ? (
		<button onClick={() => setEditMode(!editMode)}>
			{editMode ? 'Exit editing' : 'Edit'}
		</button>
	) : null;
};

export default withApollo(EditButton);
