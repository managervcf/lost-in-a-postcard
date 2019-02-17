// Import helpers from dependencies
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import 'dotenv/config';

// Import files
import typeDefs from './graphql/schema';
import resolvers from './graphql/resolvers';

// Variable declarations
// // Declare port or 4000 if in development
const port = process.env.PORT || 4000;

// Create express server
const app = express();

// Create apollo server and connect it with express.
// Specify path for graphql operations
const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: {
		me: { id: '05-09-1989', username: 'Mateusz' }
	}
});
server.applyMiddleware({ app, path: '/graphql' });

// Routes
app.get('/', (req, res) => res.send('Hello World'));

// Setup app to listen on variable 'port'
app.listen(port, () =>
	console.log(`Server ready at http://localhost:${port}.
		For GraphQL Playground, visit ${server.graphqlPath}.
	`)
);
