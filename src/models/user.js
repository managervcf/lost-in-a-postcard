// Import helper functions from mongoose.
import { Schema, model } from 'mongoose';

// Define schema
const userSchema = new Schema({
	username: {
		type: String,
		unique: true,
		trim: true,
		required: true
	},
	email: String,
	photos: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Photo'
		}
	]
});

// Enable finding user by both email and username.
userSchema.statics.findByLogin = async function(login) {
	// Try to find by username.
	let user = await this.findOne({ username: login });
	// If not found, try finding by email.
	if (!user) {
		user = await this.findOne({ email: login });
	}
	// Return found user.
	return user;
};

// Create new user.
userSchema.statics.addUser = async function(newUser) {
	// Create a user model and new document.
	const User = model('User');
	const user = new User(newUser);
	// Check if username exists.
	const { username } = newUser;
	const isUsernameAvailable = await this.findOne({ username });
	if (isUsernameAvailable)
		throw new Error('Username already exists. Use different username.');
	// Save new user to the database and return it.
	return await user.save();
};

// Delete a user and cascade delete associated with it photos.
userSchema.statics.deleteUser = async function(id) {
	// Find and delete user.
	const deletedUser = await this.findByIdAndDelete(id);
	if (!deletedUser) throw new Error('Cannot delete user. User does not exist.');
	// Find and delete user's photos.
	const deletedPhotos = await model('Photo').deleteMany({ author: id });
	if (!deletedPhotos) throw new Error(`Cannot delete photos of user ${id}`);
	// Return deleted user.
	return deletedUser;
};

// Create model out of schema.
const User = model('User', userSchema);

export default User;
