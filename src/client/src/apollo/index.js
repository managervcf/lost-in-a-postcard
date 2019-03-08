// Import necessary apollo
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { setContext } from 'apollo-link-context';

// Import upload handling package.
import { createUploadLink } from 'apollo-upload-client';

const httpLink = createUploadLink({
	uri: 'http://localhost:4000/graphql',
	credentials: 'same-origin'
});

const authLink = setContext((_, { headers }) => {
	// get the authentication token from local storage if it exists
	const token = localStorage.getItem('token');
	// return the headers to the context so httpLink can read them
	return {
		headers: {
			...headers,
			token: token ? token : ''
		}
	};
});

// Create new Apollo Client the old way.
// Unfortunately  does not work with apollo-boost
const client = new ApolloClient({
	// Use caching.
	cache: new InMemoryCache(),
	link: ApolloLink.from([
		onError(({ graphQLErrors, networkError }) => {
			if (graphQLErrors)
				graphQLErrors.map(({ message, locations, path }) =>
					console.log(
						`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`
					)
				);
			if (networkError) console.log(`[Network error]: ${networkError}`);
		}),
		// Plugin apollo-upload-client into link.
		authLink.concat(httpLink)
	])
});

// Export Apollo Client.
export default client;
