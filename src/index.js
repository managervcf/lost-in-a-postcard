// Import helpers from dependencies.
import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';

// Import schema, resolvers, models, APIs and helpers.
import schema from './schema';
import resolvers from './resolvers';
import models, { connectDb } from './models';
import api from './api';

// Create express server.
const app = express();

// Use application-level middleware.
//// Enables Cross Origin Resource Sharing.
app.use(cors());

// Create apollo server and connect it with express.
// Specify path for graphql operations. Provide context
// with models, API and current user.
const server = new ApolloServer({
	typeDefs: schema,
	resolvers,
	// Context is built once per request. Use context for authentication.
	// Also pass data that should be available for all resolvers.
	context: async ({ req }) => {
		// Perform authentication.
		// console.log(req);
		// Return context.
		return {
			models,
			api,
			currentUser: await models.User.findByLogin('managervcf')
		};
	}
});

// Apply express middleware to Apollo Server.
server.applyMiddleware({ app, path: '/graphql' });

// Routes.
app.get('/', (req, res) => {
	// console.log(req);
	res.send('Hello World');
});

// After connection with database is established,
// express application will start. 
// Change eraseDatabaseOnSync to true to erase
// database when app starts. 
const eraseDatabaseOnSync = false;

connectDb().then(async () => {
	if (eraseDatabaseOnSync) {
		await models.User.deleteMany({});
		await models.Photo.deleteMany({});
	}
	app.listen(process.env.PORT, () =>
		console.log(`Server ready on http://localhost:${process.env.PORT}.`)
	);
});
