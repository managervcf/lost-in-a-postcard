// Authorization helper. Checks if the user is a photo owner.
// Used to wrap resolvers to block sensitive queries.
export default next => async (parent, args, context, info) => {
	// Destructure me and models out of context.
	const { me, models } = context;
	// If user is not logged in, throw an error.
	if (!me) throw new Error('Unauthenticated. Please log in.');
	// If user is an admin, let him through and return resolver.
	if (me.role === 'admin') return next(parent, args, context, info);
	// If user is not the photo owner, throw an error.
	const photo = await models.Photo.findById(args.id);
	if (photo.author != me.id)
		throw new Error('Unauthorized. You are not the photo owner');
	// Otherwise, let user through and return resolver.
	return next(parent, args, context, info);
};
