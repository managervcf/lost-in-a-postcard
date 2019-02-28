// Authorization helper. checks if the user is a photo owner.
// Used to wrap resolvers to block sensitive queries.
export default next => async (parent, args, context, info) => {
	// If user is not logged in, throw an error.
	if (!context.me) throw new Error('Unauthenticated. Please log in.');

	// If user is an admin, let him through and return resolver.
	if (context.me.role === 'admin') return next(parent, args, context, info);

	// If user is not the photo owner, throw an error.
	const photo = await context.models.Photo.findById(args.id);
	if (photo.author != context.me.id)
		throw new Error('Unauthorized. You are not the photo owner');

	// Otherwise, let him through and return resolver.
	return next(parent, args, context, info);
};
