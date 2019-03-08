// Import helper functions from mongoose.
import { Schema, model } from 'mongoose';

// Import pagination helper library.
import mongoosePaginate from 'mongoose-paginate';

// Import error handler from middleware.
import { processUpload, throwError, trimAndCapitalize } from '../helpers';

// Define schema.
const photoSchema = new Schema(
	{
		upload: {
			public_id: String,
			url: String
		},
		country: {
			type: String,
			trim: true,
			required: [true, 'Where the photo was taken?']
		},
		caption: {
			type: String,
			trim: true
		},
		author: {
			type: Schema.Types.ObjectId,
			ref: 'User'
		}
	},
	// Enable auto timestamps.
	{ timestamps: true }
);

// Insert plugins.
photoSchema.plugin(mongoosePaginate);

// BUSINESS LOGIC.

// Find and paginate requested photos. Default max photos is 100.
photoSchema.statics.findPhotos = async function({
	country = '',
	limit = 10,
	page = 1
}) {
	// Create pagination options variable.
	let paginationOptions = {
		// Return in specified order.
		sort: { createdAt: 'descending' },
		// Passed user specified pagination criteria.
		limit,
		page
	};

	// Trim and capitalize requested country.
	country = trimAndCapitalize(country);

	// Create a mongoose query.
	let query = country ? { country } : {}

	// Make a query using mongoose-paginate library.
	let res = await this.paginate(query, paginationOptions);
	throwError(!res, 'Cannot get requested photos.');

	// Return requested photos.
	console.log(
		`(GraphQL) ${
			country ? `Searched for ${country}. ` : 'No search phrase. '
		}Retrieved ${res.docs.length} photos from page ${page}/${
			res.pages
		}. Requested ${limit} out of ${res.total} photos meeting query criteria.`
	);

	// Return page of photos.
	return {
		docs: res.docs,
		pageInfo: {
			...res,
			// Checks if there is a next page.
			hasNextPage: page >= res.pages ? false : true
		}
	};
};

// Creates a photo and associates it with user.
photoSchema.statics.addPhoto = async function(id, args) {
	// Process file upload using helper function.
	// Returns object with url and public_id.
	let upload = await processUpload(args);

	// Create new photo object.
	let newPhoto = { ...args, upload, author: id };

	// Save photo to database.
	let createdPhoto = await Photo.create(newPhoto);
	throwError(!createdPhoto, 'Could not create new photo.');

	// Find user and update it's photos.
	let user = await model('User').findById(id);
	throwError(!user, 'User is not logged in or does not exist');
	user.photos = [...user.photos, createdPhoto.id];
	let savedUser = await user.save();
	throwError(!savedUser, 'Cannot add new photo to user.');

	// Return newly created photo.
	console.log(
		`(GraphQL) Added photo from ${createdPhoto.country} (${
			createdPhoto.url
		}) by ${savedUser.username} (${savedUser.id})`
	);
	return createdPhoto;
};

// Delete a photo and update user.
photoSchema.statics.deletePhoto = async function(id) {
	// Delete photo and populate author field to access his id.
	let deletedPhoto = await this.findByIdAndDelete(id).populate('author');
	throwError(!deletedPhoto, 'Cannot delete photo. Photo does not exist.');

	// Get user by id to modify photos array.
	let user = await model('User').findById(deletedPhoto.author.id);
	throwError(!user, 'User does not exist.');

	// Update user with updated photos array.
	let updatedUser = await model('User').findByIdAndUpdate(
		deletedPhoto.author.id,
		{ photos: user.photos.filter(photoId => photoId != id) }
	);
	throwError(!updatedUser, 'Cannot update user. User does not exist.');

	// Return deleted photo.
	console.log(
		`(GraphQL) Deleted photo from ${deletedPhoto.country} (${
			deletedPhoto.id
		}) by ${updatedUser.username} (${updatedUser.id})`
	);
	return deletedPhoto;
};

// Create model out of schema.
const Photo = model('Photo', photoSchema);

// Export deafult model.
export default Photo;
