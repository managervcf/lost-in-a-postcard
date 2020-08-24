// Import helpers from dependencies.
import 'dotenv/config';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import path from 'path';
import express from 'express';
import { ApolloServer } from 'apollo-server-express';

// Import schema, resolvers, models, helpers and config.
import typeDefs from './schema';
import resolvers from './resolvers';
import models, { connectDb } from './models';
import { maxFileSize, maxFiles } from './config';

// Import middleware helpers.
import { getMe } from './utils';

// Create express server.
const app = express();

// Express will serve up production assets.
const clientPath = path.resolve(__dirname + '/../client/build');
if (process.env.NODE_ENV === 'production') {
  // Set static folder.
  app.use('/', express.static(clientPath));
  // Other requests go here.
  app.get('*', (req, res) =>
    res.sendFile(path.resolve(clientPath, 'index.html'))
  );
}

// Create apollo server. Provide context
// with models, API and current user (me).
const server = new ApolloServer({
  // Enable CORS.
  cors: {
    origin: '*', // <- allow request from all domains.
    credentials: true, // <- enable CORS response for requests with credentials.
  },
  // Upload limits.
  uploads: { maxFileSize, maxFiles },
  typeDefs,
  resolvers,
  // Context is built once per request.
  // Use context for authentication.
  // Pass data that should be available for all resolvers.
  context: ({ req }) => {
    // Perform authentication.
    const me = getMe(req);
    // Return context.
    return {
      models,
      me,
    };
  },
});

// Apply middleware.
server.applyMiddleware({ app, path: '/graphql' });

// After connection with database is established,
// express application will start.
connectDb().then(() =>
  app.listen(process.env.PORT, () =>
    console.log(`Server ready on http://localhost:${process.env.PORT}.`)
  )
);
