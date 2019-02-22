// Import helpers from dependencies.
import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';

// Import schema, resolvers, models, APIs and helpers.
import schema from './schema';
import resolvers from './resolvers';
import models, { connectDb } from './models';
import services from './services';

// Create express server.
const app = express();

// Use application-level middleware.
//// Enables Cross Origin Resource Sharing.
app.use(cors());

// Create apollo server and connect it with express.
// Specify path for graphql operations. Provide context
// with models and API.
const server = new ApolloServer({
	typeDefs: schema,
	resolvers,
	context: async () => ({
		models,
		services,
		loggedUser: await models.User.findByLogin('managervcf')
	})
});

server.applyMiddleware({ app, path: '/graphql' });

// Routes
app.get('/', (req, res) => res.send('Hello World'));

// After connection with database is established,
// express application will start.
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
