// Import helper functions from mongoose.
import { Schema, model } from 'mongoose';

// Define schema.
const photoSchema = new Schema(
	{
		url: {
			type: String,
			trim: true,
			required: [true, 'Photo url is required.']
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

// BUSINESS LOGIC.

// Creates a photo and associates it with user.
photoSchema.statics.addPhoto = async function(id, args) {
	// Create new photo.
	let Photo = model('Photo');
	let newPhoto = new Photo({ ...args, author: id });
	// Save photo to database.
	let createdPhoto = await newPhoto.save();
	if (!createdPhoto) throw new Error('Could not create new photo.');
	// Find user and update it's photos.
	let user = await model('User').findById(id);
	if (!user) throw new Error('User is not logged in or does not exist');
	user.photos = [...user.photos, createdPhoto.id];
	let savedUser = await user.save();
	if (!savedUser) throw new Error('Cannot add new photo to user.');
	// Return newly created photo.
	console.log(
		`(ACTION) Added photo from ${createdPhoto.country} (${
			createdPhoto.id
		}) by ${savedUser.username} (${savedUser.id})`
	);
	return createdPhoto;
};

// Delete a photo and update user.
photoSchema.statics.deletePhoto = async function(id) {
	// Delete photo and populate author field to access his id.
	let deletedPhoto = await this.findByIdAndDelete(id).populate('author');
	if (!deletedPhoto)
		throw new Error('Cannot delete photo. Photo does not exist.');
	// Get user by id to modify photos array.
	let user = await model('User').findById(deletedPhoto.author.id);
	if (!user) throw new Error('User does not exist.');
	// Update user with updated photos array.
	let updatedUser = await model('User').findByIdAndUpdate(
		deletedPhoto.author.id,
		{ photos: user.photos.filter(photoId => photoId != id) }
	);
	if (!updatedUser) throw new Error('Cannot update user. User does not exist.');
	// Return deleted photo.
	console.log(
		`(ACTION) Deleted photo from ${deletedPhoto.country} (${
			deletedPhoto.id
		}) by ${updatedUser.username} (${updatedUser.id})`
	);
	return deletedPhoto;
};

// Create model out of schema.
const Photo = model('Photo', photoSchema);

export default Photo;
