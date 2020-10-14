import 'dotenv/config';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import path from 'path';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';

import { typeDefs } from './schema';
import { resolvers } from './resolvers';
import { connectDb, models } from './models';

import { getMe } from './utils';

// Create an express server.
const app = express();

// Check the environmental variables.
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = 'development';
}

// Print out the current node environment.
console.log('(Server) Node environment:', process.env.NODE_ENV);

// Serve up production assets.
const clientPath = path.resolve(__dirname + '/../client/build');

/**
 * If in production or ci environment, set static folder and
 * catch all other requests.
 */
if (['production', 'ci'].includes(process.env.NODE_ENV)) {
  app.use('/', express.static(clientPath));
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(clientPath, 'index.html'))
  );
}

/**
 * Create an Apollo Server.
 * Context is built once per request and used for authentication
 * and providing common data available for all resolvers.
 */
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ models, me: getMe(req) }),
});

// Apply middleware.
server.applyMiddleware({
  app,
  path: '/graphql',
  cors: {
    origin: '*', // <- allow request from all domains.
    credentials: true, // <- enable CORS response for requests with credentials.
  },
});

// After connection with database is established,
// express application will start.
const start = async () => {
  await connectDb();
  app.listen(process.env.PORT, () =>
    console.log(`(Server) Listening on http://localhost:${process.env.PORT}.`)
  );
};

start();
