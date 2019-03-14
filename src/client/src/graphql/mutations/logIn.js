import gql from 'graphql-tag';

export default gql`
	mutation logIn($login: String!, $password: String!) {
		logIn(login: $login, password: $password) {
			token
		}
	}
`;
