// Authentication helper. Checks if the user is logged in.
// Used to wrap resolvers to block sensitive queries.
export const isAuthenticated = next => (parent, args, context, info) =>
  !context.me
    ? new Error('Unauthenticated. Please log in.')
    : next(parent, args, context, info);
