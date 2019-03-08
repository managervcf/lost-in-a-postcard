import gql from 'graphql-tag';

export default gql`
	query getCountries($search: String){
		countries(search: $search) {
			name
    	nativeName
    	region
    	flag
		}
	}
`;
