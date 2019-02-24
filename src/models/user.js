// Import helper functions from mongoose and unique validator.
import { Schema, model } from 'mongoose';
import uniqueValidator from 'mongoose-unique-validator';
import bcrypt from 'bcryptjs';

// Import email regex helper and error handler from middleware.
import { emailRegex, throwError } from '../middleware';

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
			match: [emailRegex, 'Incorrect email address.']
		},
		password: {
			type: String,
			required: [true, 'You must provide password.'],
			minlength: [7, 'Password must be at least 7 characters.']
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

// Create new user.
userSchema.statics.signup = async function(newUser) {
	let createdUser = new User(newUser);
	let savedUser = await createdUser.save();
	throwError(!savedUser, 'Cannot create new user.');
	// Return new user.
	console.log(
		`(ACTION) Added user ${createdUser.username} (${
			createdUser.id
		}) with email ${createdUser.email}.`
	);
	return createdUser;
};

// Login user.
userSchema.statics.login = async function(login, password) {
	// Try to find by username.
	let user = await this.findOne({ username: login });
	// If not found, try finding by email.
	if (!user) {
		user = await this.findOne({ email: login });
	}
	throwError(!user, `User ${login} does not exist.`);
	throwError(
		!bcrypt.compareSync(password, user.password),
		`The password is invalid.`
	);
	console.log(
		`(ACTION) Logged in user ${
			user.username
		}. The username and password combination is correct.`
	);
	return user;
};

// Delete a user and cascade delete associated with it photos.
userSchema.statics.deleteUser = async function(id) {
	// Find and delete user.
	let deletedUser = await this.findByIdAndDelete(id);
	throwError(!deletedUser, 'Cannot delete user. User does not exist.');
	// Find and delete user's photos.
	let deletedPhotos = await model('Photo').deleteMany({ author: id });
	throwError(!deletedPhotos, `Cannot delete photos of user ${id}`);
	// Return deleted user.
	console.log(
		`(ACTION) Deleted user ${deletedUser.username} (${deletedUser.id}) and ${
			deletedPhotos.deletedCount
		} corresponding photos.`
	);
	return deletedUser;
};

// IMPORTANT PASSWORD SECURITY STEP.
// Define a pre event for the save.When the save function is called,
// we will first check to see if the user is being created or changed.
// If the user is not being created or changed, we will skip over the hashing part.
// We don’t want to hash our already hashed data.
userSchema.pre('save', function(next) {
	if (!this.isModified('password')) {
		return next();
	}
	this.password = bcrypt.hashSync(this.password, 10);
	next();
});

// Create model out of schema.
const User = model('User', userSchema);

// Export default model.
export default User;
