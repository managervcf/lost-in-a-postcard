// Import resolver guards.
import { isAuthenticated, isAuthorized } from '../helpers';

// Create and immediately export default resolvers.
export default {
	Query: {
		photos: async (parent, args, { models }) =>
			await models.Photo.findPhotos(args),
		photo: async (parent, { id }, { models }) => await models.Photo.findById(id)
	},

	Mutation: {
		createPhoto: async (parent, args, { models, me }) =>
			await models.Photo.addPhoto('5c74c5a7e116f01d608a7aa8', args),
		updatePhoto: isAuthorized(
			async (parent, args, { models }) =>
				await models.Photo.findByIdAndUpdate(args.id, args, { new: true })
		),
		deletePhoto: isAuthorized(
			async (parent, { id }, { models }) => await models.Photo.deletePhoto(id)
		)
	},

	Photo: {
		author: async ({ author }, args, { models }) =>
			await models.User.findById(author),
		createdAt: ({ createdAt }) => createdAt.toString(),
		updatedAt: ({ updatedAt }) => updatedAt.toString()
	}
};
