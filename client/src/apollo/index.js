// Import necessary apollo
import { ApolloClient } from 'apollo-client';
import { InMemoryCache } from 'apollo-cache-inmemory';
import { ApolloLink } from 'apollo-link';
import { onError } from 'apollo-link-error';
import { setContext } from 'apollo-link-context';

// Import upload handling package.
import { createUploadLink } from 'apollo-upload-client';

const cache = new InMemoryCache();

const baseUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_GRAPHQL_URI
    : 'http://localhost:4000';

const httpLink = createUploadLink({
  uri: `${baseUrl}/graphql`,
  credentials: 'same-origin',
});

const authLink = setContext((_, { headers }) => {
  // Get the authentication token from local storage if it exists.
  const token = localStorage.getItem('token');
  // Return the headers to the context so httpLink can read them.
  return {
    headers: {
      ...headers,
      token: token || null,
    },
  };
});

const link = ApolloLink.from([
  onError(({ graphQLErrors, networkError }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: line: ${locations[0].line} column: ${locations[0].column}`
        )
      );
    if (networkError) console.log(`[Network error]: ${networkError}`);
  }),
  // Plugin apollo-upload-client into link.
  authLink.concat(httpLink),
]);

// Create new Apollo Client the old way.
// Unfortunately upload package does not work with apollo-boost.
// Export Apollo Client.
export const client = new ApolloClient({ cache, link });
