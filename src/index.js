// Import helpers from dependencies.
import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';

// Import schema, resolvers, models, APIs and helpers.
import typeDefs from './schema';
import resolvers from './resolvers';
import models, { connectDb } from './models';
import api from './api';

// Import middleware helpers.
import { getMe } from './helpers';

// Create express server.
const app = express();

// Use application-level middleware.
// Enables Cross Origin Resource Sharing.
app.use(cors());

// Create apollo server. Provide context
// with models, API and current user (me).
const server = new ApolloServer({
	typeDefs,
	resolvers,
	// Context is built once per request.
	// Use context for authentication.
	// Pass data that should be available for all resolvers.
	context: async ({ req }) => {
		// Perform authentication.
		let me = await getMe(req);
		// Return context.
		return {
			models,
			api,
			me
		};
	}
});

// Apply express as Apollo Server middleware.
// Specify path for graphql operations.
server.applyMiddleware({ app, path: '/graphql' });

// After connection with database is established,
// express application will start.
connectDb().then(() =>
	app.listen(process.env.PORT, () =>
		console.log(`Server ready on http://localhost:${process.env.PORT}.`)
	)
);
