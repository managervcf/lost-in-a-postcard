import gql from 'graphql-tag';

export default gql`
	mutation createPhoto($file: Upload!, $country: String!, $caption: String) {
		createPhoto(file: $file, country: $country, caption: $caption) {
			id
			country
			upload {
				url
				public_id
			}
		}
	}
`;
