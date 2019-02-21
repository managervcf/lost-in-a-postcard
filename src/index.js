// Import helpers from dependencies.
import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';

// Import schema, resolvers, models, APIs and helpers.
import schema from './schema';
import resolvers from './resolvers';
import models, { connectDb } from './models';
import API from './api';

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
	context: {
		models,
		API,
		me: { id: '5c6e3751fc68a424241ba877' }
	}
});

server.applyMiddleware({ app, path: '/graphql' });

// Routes
app.get('/', (req, res) => res.send('Hello World'));

// After connection with database is established,
// express application will start.
connectDb().then(async () => {
	console.log('Conntected to mLab database.');
	app.listen(process.env.PORT, () =>
		console.log(`Server ready on http://localhost:${process.env.PORT}.`)
	);
});
