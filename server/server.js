// Import helpers from dependencies
const express = require('express');
const { ApolloServer } = require('apollo-server-express');

// Import files
const typeDefs = require('./graphql/schema');
const resolvers = require('./graphql/resolvers');

// Variable declarations
const port = process.env.PORT || 4000;

// Create express server
const app = express();

// Create apollo server and connect it with express
const server = new ApolloServer({ typeDefs, resolvers });
server.applyMiddleware({ app });

// Routes
app.get('/', (req, res) => res.send('Hello World'));

// Setup app to listen on variable 'port'
app.listen(port, () =>
	console.log(`Server ready at http://localhost:${port}.
		For GraphQL Playground, visit ${server.graphqlPath}.
	`)
);
