// Authorization helper. Checks if the user is a photo owner.
// Used to wrap resolvers to block sensitive queries.
export default next => async (parent, args, context, info) => {
	if (!context.me) throw new Error('Unauthenticated. Please log in.');
	const photo = await context.models.Photo.findById(args.id);
	console.log(photo.author);
	console.log(context.me.id);
	if (photo.author != context.me.id)
		throw new Error('Unauthorized. You must be the photo owner.');
	return next(parent, args, context, info);
};
