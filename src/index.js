// Import helpers from dependencies
import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';

// Import files
import typeDefs from './graphql/schema';
import resolvers from './graphql/resolvers';

// Create express server
const app = express();

// Use application-level middleware
//// Enables Cross Origin Resource Sharing
app.use(cors());

// Create apollo server and connect it with express.
// Specify path for graphql operations
const server = new ApolloServer({
	typeDefs,
	resolvers,
	context: {
		me: { id: '1', username: 'Mateusz' }
	}
});
server.applyMiddleware({ app, path: '/graphql' });

// Routes
app.get('/', (req, res) => res.send('Hello World'));

// Setup app to listen on variable 'port'
app.listen(process.env.PORT, () =>
	console.log(
		`Server ready at http://localhost:${process.env.PORT}.`,
		`For GraphQL Playground, visit ${server.graphqlPath}.`
	)
);
