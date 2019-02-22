// Import helper functions from mongoose.
import { Schema, model } from 'mongoose';

// Define schema.
const photoSchema = new Schema({
	url: {
		type: String,
		trim: true,
		required: true
	},
	country: {
		type: String,
		trim: true,
		required: true
	},
	caption: {
		type: String,
		default: '',
		trim: true
	},
	author: {
		type: Schema.Types.ObjectId,
		ref: 'User'
	}
});

// Creates a photo and associates it with user.
photoSchema.statics.addPhoto = async function(id, args) {
	// Create new photo.
	const Photo = model('Photo');
	const newPhoto = new Photo({ ...args, author: id });
	// Save photo to database.
	const createdPhoto = await newPhoto.save();
	if (!createdPhoto) throw new Error('Could not create new photo.');
	// Find user and update it's photos.
	const user = await model('User').findById(id);
	if (!user) throw new Error('User is not logged in or does not exist');
	user.photos = [...user.photos, createdPhoto.id];
	const savedUser = await user.save();
	if (!savedUser) throw new Error('Cannot add new photo to user.');
	// Return newly created photo.
	return createdPhoto;
};

// Delete a photo and update user.
photoSchema.statics.deletePhoto = async function(id) {
	// Delete photo and populate author field to access his id.
	const deletedPhoto = await this.findByIdAndDelete(id).populate('author');
	if (!deletedPhoto)
		throw new Error('Cannot delete photo. Photo does not exist.');
	// Get user by id to modify photos array.
	const user = await model('User').findById(deletedPhoto.author.id);
	if (!user) throw new Error('User does not exist.');
	// Update user with updated photos array.
	const updatedUser = await model('User').findByIdAndUpdate(
		deletedPhoto.author.id,
		{ photos: user.photos.filter(photoId => photoId != id) }
	);
	if (!updatedUser) throw new Error('Cannot update user. User does not exist.');
	// Return deleted photo.
	return deletedPhoto;
};

// Create model out of schema.
const Photo = model('Photo', photoSchema);

export default Photo;
