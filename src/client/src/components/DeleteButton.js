import React from 'react';
import { Mutation, withApollo } from 'react-apollo';

import { DELETE_PHOTO } from '../graphql/mutations';
import { PHOTOS } from '../graphql/queries';

const DeleteButton = ({ id, country, client }) => (
	<Mutation
		mutation={DELETE_PHOTO}
		variables={{ id }}
		onCompleted={async () => await client.resetStore()}
		refetchQueries={async () => await [{ query: PHOTOS }]}
	>
		{(mutate, { error, loading }) => {
			let { me } = client.cache.data.data.ROOT_QUERY;
			if (error) return <p>{error.message}</p>;
			if (me) {
				return (
					<button disabled={loading} onClick={mutate}>
						{loading ? 'Deleting...' : 'Delete'}
					</button>
				);
			} else return null;
		}}
	</Mutation>
);

export default withApollo(DeleteButton);
