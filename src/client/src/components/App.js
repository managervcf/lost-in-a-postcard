import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Query } from 'react-apollo';

import Header from './Header';
import Login from './Login';
import Gallery from './Gallery';
import UploadForm from './UploadForm';
import LoggedUser from './LoggedUser';
import NotFound from './NotFound';
import ME from '../graphql/queries/me';

const App = () => (
	<Query query={ME}>
		{({ data, loading, error, refetch }) => {
			return (
				<div className="App">
					<Route path="/" component={Header} />
					{data && data.me && (
						<Route
							path="/"
							render={props => (
								<LoggedUser {...props} me={data.me} refetch={refetch} />
							)}
						/>
					)}
					<Switch>
						<Route exact path="/" component={Gallery} />
						<Route exact path="/login" render={props => <Login {...props} />} />
						{data && data.me && (
							<Route exact path="/new" component={UploadForm} />
						)}
						<Route path="/:country" component={Gallery} />
						<Route component={NotFound} />
					</Switch>
				</div>
			);
		}}
	</Query>
);

export default App;
