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
	let User = model('User');
	let user = new User(newUser);
	// Check if username exists.
	let { username } = newUser;
	let isUsernameAvailable = await this.findOne({ username });
	if (isUsernameAvailable)
		throw new Error('Username already exists. Use different username.');
	// Save new user to the database.
	let { createdUser } = await user.save();
	if (!createdUser) throw new Error('Cannot create new user');
	// Return new user.
	console.log(
		`(ACTION) Added user ${createdUser.username} (${createdUser.id})`
	);
	return user;
};

// Delete a user and cascade delete associated with it photos.
userSchema.statics.deleteUser = async function(id) {
	// Find and delete user.
	let deletedUser = await this.findByIdAndDelete(id);
	if (!deletedUser) throw new Error('Cannot delete user. User does not exist.');
	// Find and delete user's photos.
	let deletedPhotos = await model('Photo').deleteMany({ author: id });
	if (!deletedPhotos) throw new Error(`Cannot delete photos of user ${id}`);
	// Return deleted user.
	console.log(
		`(ACTION) Deleted user ${deletedUser.username} (${
			deletedUser.id
		}) and corresponding photos (${deletedPhotos.deletedCount})`
	);
	return deletedUser;
};

// Create model out of schema.
const User = model('User', userSchema);

export default User;
