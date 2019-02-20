// import helper functions from mongoose
import { Schema, model } from 'mongoose';

// Define schema
const userSchema = new Schema({
	username: { type: String, unique: true, trim: true }
	// email: { type: String, unique: true },
	// messages: { type: [Schema.Types.ObjectId], ref: 'Message' }
});

// Enable finding user by both email and username
userSchema.statics.findByLogin = async function(login) {
	// Try to find by username
	let user = await this.findOne({ username: login });
	// If not found, try finding by email
	if (!user) {
		user = await this.findOne({ email: login });
	}
	return user;
};

// Perform cascade delete for all messages owned by user
userSchema.pre('remove', function(next) {
	this.model('Message').deleteMany({ user: this._id }, next);
});

// Create model 'User' out of userSchema
const User = model('User', userSchema);

export default User;
