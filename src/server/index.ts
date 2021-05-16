import 'dotenv/config';
import path from 'path';
import express, { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';
import { connectDb } from './models';
import { getCurrentUser } from './utils';
import { config } from './config';

// Check if environmental variables have been defined.
config.checkEnvVariables();

// Create an express server.
const app: Application = express();

// Print out the current node environment.
console.log(`(Server) Node environment: ${config.nodeEnv}`);

/**
 * If in production or ci environment, set static folder and
 * catch all other requests.
 */
if (config.isProduction()) {
  const clientPath = path.resolve(`${__dirname}/../../src/client/build`);
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
const server: ApolloServer = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ me: getCurrentUser(req) }),
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

/**
 * After connection with database is established,
 * express application will start.
 */
async function start() {
  try {
    await connectDb();
    app.listen(config.port, () =>
      console.log(`(Server) Listening on port ${config.port}.`)
    );
  } catch (error) {
    console.log('(Server) Unable to connect to the database.', error);
    process.exit(1);
  }
}

/**
 * Initialize the application.
 */
start();
