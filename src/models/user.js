// Import helper functions from mongoose and unique validator.
import { Schema, model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';

// Import helpers.
import emailRegex from '../helpers/emailRegex';

// Define schema
const userSchema = new Schema(
	{
		username: {
			type: String,
			unique: true,
			trim: true,
			required: [true, 'You must provide username.'],
			minlength: [2, 'Username must be at least 2 characters.'],
			maxlength: [20, 'Username must be no more than 20 characters.']
		},
		email: {
			type: String,
			unique: true,
			trim: true,
			lowercase: true,
			required: true,
			match: [emailRegex, 'Incorrect email format.']
		},
		password: {
			type: String,
			required: [true, 'You must provide password.'],
			minlength: [7, 'Password must be at least 7 characters.'],
			maxlength: [42, 'Password must be no more than 42 characters.']
		},
		photos: [
			{
				type: Schema.Types.ObjectId,
				ref: 'Photo'
			}
		]
	},
	// Enable auto timestamps.
	{ timestamps: true }
);

// Inser schema plugins.
userSchema.plugin(uniqueValidator);

// Create model out of schema.
const User = model('User', userSchema);

// BUSINESS LOGIC.

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

// Temporary
const createToken = async user => 'token!';

// Create new user.
userSchema.statics.signUp = async function(newUser) {
	let createdUser = await User.create(newUser);
	if (!createdUser) throw new Error('Cannot create new user.');
	// Return new user.
	console.log(
		`(ACTION) Added user ${createdUser.username} (${
			createdUser.id
		}) with email ${createdUser.email}.`
	);
	return { token: createToken(createdUser) };
};

// Delete a user and cascade delete associated with it photos.
userSchema.statics.deleteUser = async function(id) {
	// Find and delete user.
	let deletedUser = await this.findByIdAndDelete(id);
	if (!deletedUser) throw new Error('Cannot delete user. User does not exist.');
	// Find and delete user's photos.
	let deletedPhotos = await model;('Photo').deleteMany({ author: id });
	if (!deletedPhotos) throw new Error(`Cannot delete photos of user ${id}`);
	// Return deleted user.
	console.log(
		`(ACTION) Deleted user ${deletedUser.username} (${deletedUser.id}) and ${
			deletedPhotos.deletedCount
		} corresponding photos.`
	);
	return deletedUser;
};

// Export default model.
export default User;
