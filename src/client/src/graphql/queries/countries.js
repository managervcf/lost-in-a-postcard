import gql from 'graphql-tag';

export default gql`
	query countries($search: String){
		countries(search: $search) {
			name
    	nativeName
    	region
    	flag
		}
	}
`;
