import 'dotenv/config';
import path from 'path';
import http from 'http';
import express, { Application } from 'express';
import { ApolloServer } from 'apollo-server-express';
import {
  ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageGraphQLPlayground,
} from 'apollo-server-core';
import { typeDefs } from './schema';
import { resolvers } from './resolvers';
import { dataloaders } from './dataloaders';
import { connectDb } from './models';
import { getCurrentUser } from './utils';
import { config } from './config';

async function main() {
  // Check if environmental variables have been defined.
  config.checkEnvVariables();

  // Create an express and http server.
  const app: Application = express();
  const httpServer = http.createServer(app);

  /**
   * If in production or ci environment, set static folder and
   * catch all other requests.
   */
  if (config.isProduction()) {
    const clientPath = path.resolve(`${__dirname}/../../src/client/build`);

    app.use('/', express.static(clientPath));
    app.get('*', (_req, res) => res.sendFile(path.resolve(clientPath, 'index.html')));
  }

  /**
   * Create an Apollo Server.
   * Context is built once per request and used for authentication
   * and providing common data available for all resolvers.
   */
  const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      ApolloServerPluginLandingPageGraphQLPlayground(),
    ],
    context: ({ req }) => ({
      /**
       * Currently logged in user.
       */
      me: getCurrentUser(req),
      /**
       * Dataloaders handling GraphQL n+1 problem.
       */
      dataloaders,
    }),
  });

  // Start server. Without this, apollo will throw an error.
  await server.start();

  // Apply middleware.
  server.applyMiddleware({
    app,
    path: '/graphql',
  });

  /**
   * After connection with database is established,
   * express application will start.
   */
  try {
    connectDb();
    app.listen(config.port, () =>
      console.log(`(Server) Listening on port ${config.port}.`)
    );
  } catch (error) {
    console.log('(Server) Unable to connect to the database.', error);
    process.exit(1);
  }
}

main();
