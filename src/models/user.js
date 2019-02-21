// import helper functions from mongoose.
import { Schema, model } from 'mongoose';

// Define schema
const userSchema = new Schema({
	username: {
		type: String,
		unique: true,
		trim: true,
		required: true
	},
	email: {
		type: String,
		default: 'example@mail.com'
	},
	messages: [
		{
			type: Schema.Types.ObjectId,
			ref: 'Message'
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
	return user;
};

// Associate message with user.
userSchema.statics.findByIdAndAddMessage = async function(id, newMessage) {
	// Find user by id.
	let user = await this.findById(id);
	// Push newMessage to messages array.
	user.messages.push(newMessage);
	// Save user to database.
	await user.save();
	return user;
};

// Creates new user.
userSchema.statics.addUser = async function({ username }) {
	// Create a user model.
	const User = model('User');
	// Create new user document.
	const newUser = new User({ username });
	// Check if username exists.
	const isUsernameAvailable = await this.findOne({ username });
	if (isUsernameAvailable)
		throw new Error('Username already exists. Use different username.');

	// Save new User to the database and return it.
	return await newUser.save();
};

// Creates a message and associates it with user.
userSchema.statics.addMessage = async function(id, text) {
	// Create a message model.
	const Message = model('Message');
	// Find user, create new message, update its messages.
	// Save to database and resolve promises.
	return this.findById(id).then(user => {
		console.log(user);
		const message = new Message({ text, user: user.id});
		user.messages = [...user.messages, message];
		return Promise.all([user.save(), message.save()]).then(
			([user, message]) => message
		);
	});
};

// Perform cascade delete for all messages owned by a user.
userSchema.pre('remove', function(next) {
	this.model('Message').deleteMany({ user: this._id }, next);
});

// Create model 'User' out of userSchema.
const User = model('User', userSchema);

export default User;
