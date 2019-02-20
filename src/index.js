// Import helpers from dependencies
import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';

// Import files
import schema from './schema';
import resolvers from './resolvers';
import models, { connectDb } from './models';

// Create express server
const app = express();

// Use application-level middleware
//// Enables Cross Origin Resource Sharing
app.use(cors());

// Create apollo server and connect it with express.
// Specify path for graphql operations
const server = new ApolloServer({
	typeDefs: schema,
	resolvers,
	context: {
		models,
		me: { id: '1', username: 'Mateusz Pyzowski' }
	}
});
server.applyMiddleware({ app, path: '/graphql' });

// Routes
app.get('/', (req, res) => res.send('Hello World'));

// After connections with database is established,
// express application can start. Defined a variable
// that enables erasing database on restart.
const eraseDatabaseOnSync = false;

connectDb().then(async () => {
	if (eraseDatabaseOnSync) {
		await Promise.all([
			models.User.deleteMany({}),
			models.Message.deleteMany({})
		]);
	}
	app.listen(process.env.PORT, () =>
		console.log(`Server listening on port ${process.env.PORT}...`)
	);
});
