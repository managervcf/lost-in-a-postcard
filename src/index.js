// Import helpers from dependencies.
import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';
// Import authentication libraries.
import jwt from 'jsonwebtoken';
import expressJwt from 'express-jwt';

// Import schema, resolvers, models, APIs and helpers.
import typeDefs from './schema';
import resolvers from './resolvers';
import models, { connectDb } from './models';
import api from './api';

// Import middleware helpers.
import { getMe } from './helpers';

// Create express server.
const app = express();

// Configure authentication middleware.
const auth = expressJwt({
	secret: process.env.JWT_SECRET,
	credentialsRequired: false
});

// User auth middleware.
app.use(auth);

// Use application-level middleware.
//// Enables Cross Origin Resource Sharing.
app.use(cors());

// Create apollo server and connect it with express.
// Specify path for graphql operations. Provide context
// with models, API and current user (me).
const server = new ApolloServer({
	typeDefs,
	resolvers,
	// Context is built once per request. Use context for authentication.
	// Also pass data that should be available for all resolvers.
	context: async ({ req }) => {
		// Perform authentication.
		// const me = await getMe(req);
		// console.log(me);
		// Return context.
		return {
			models,
			api,
			me: await models.User.findByLogin('domi')
		};
	}
});

// Apply express middleware to Apollo Server.
server.applyMiddleware({ app, path: '/graphql' });

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
