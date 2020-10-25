import { onError } from 'apollo-link-error';
import { setContext } from 'apollo-link-context';
import {
  ApolloClient,
  ApolloLink,
  HttpLink,
  InMemoryCache,
} from 'apollo-boost';

const baseUrl =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_GRAPHQL_URI
    : 'http://localhost:4000';

const httpLink = new HttpLink({
  uri: `${baseUrl}/graphql`,
  credentials: 'same-origin',
});

const authLink = setContext((operation, { headers }) => {
  // Get the authentication token from local storage if it exists.
  const token = localStorage.getItem('token');
  // Return the headers to the context so httpLink can read them.
  return {
    headers: {
      ...headers,
      token,
    },
  };
});

const errorLink = onError(
  ({ graphQLErrors, networkError, forward, operation }) => {
    if (graphQLErrors)
      graphQLErrors.map(({ message, locations }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: line: ${locations?.[0].line} column: ${locations?.[0].column}`
        )
      );
    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
    }

    return forward(operation);
  }
);

/**
 * Create the Apollo Client.
 */
export const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: ApolloLink.from([errorLink, authLink, httpLink]),
});
