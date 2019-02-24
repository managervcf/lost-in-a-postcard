// Authentication helper. Checks if the user is logged in.
// Used to wrap resolvers to block some queries.
export default next => (parent, args, context, info) =>
	!context.currentUser
		? new Error('Unauthenticated')
		: next(parent, args, context, info);
