import gql from 'graphql-tag';

export default gql`
	mutation deletePhoto($id: ID!) {
		deletePhoto(id: $id) {
			id
			country {
				name
			}
		}
	}
`;
