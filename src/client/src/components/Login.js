import React from 'react';
import { Mutation } from 'react-apollo';

import LoginForm from './LoginForm';
import LOGIN from '../graphql/mutations/logIn';

const Login = ({ history }) => (
	<Mutation mutation={LOGIN}>
		{(mutate, status) => (
			<LoginForm history={history} mutate={mutate} {...status} />
		)}
	</Mutation>
);

export default Login;
