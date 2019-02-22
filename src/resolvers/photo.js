// Create and immediately export default resolvers.
export default {
	Query: {
		photos: async (parent, args, { models }) => await models.Photo.find({}),
		photo: async (parent, { id }, { models }) =>
			await models.Photo.findById(id),
		photoByCountry: async (parent, { country }, { models }) =>
			await models.Photo.find({ country })
	},

	Mutation: {
		createPhoto: async (parent, args, { models, loggedUser }) =>
			await models.Photo.addPhoto(loggedUser.id, args),
		updatePhoto: async (parent, args, { models }) =>
			await models.Photo.findByIdAndUpdate(args.id, args, { new: true }),
		deletePhoto: async (parent, { id }, { models }) =>
			await models.Photo.deletePhoto(id)
	},

	Photo: {
		author: async ({ author }, args, { models }) =>
			await models.User.findById(author)
	}
};
