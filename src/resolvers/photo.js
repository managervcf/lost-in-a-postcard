// Import resolver guards.
import { authenticated, photoOwner } from '../helpers';

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
		createPhoto: authenticated(
			async (parent, args, { models, me }) =>
				await models.Photo.addPhoto(me.id, args)
		),
		updatePhoto: photoOwner(
			async (parent, args, { models }) =>
				await models.Photo.findByIdAndUpdate(args.id, args, { new: true })
		),
		deletePhoto: photoOwner(
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
