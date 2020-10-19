import bcrypt from 'bcryptjs';
import { Schema, model, Types } from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';
import { createToken } from '../utils';
import { config } from '../config';
import { Photo } from './photo';
import {
  AuthResult,
  LogInArgs,
  UserAttributes,
  UserDoc,
  UserModel,
} from '../types';

// Define schema.
const userSchema = new Schema(
  {
    username: {
      type: String,
      unique: true,
      trim: true,
      required: [true, 'You must provide username.'],
      minlength: [2, 'Username must be at least 2 characters.'],
      maxlength: [20, 'Username must be no more than 20 characters.'],
    },
    email: {
      type: String,
      unique: true,
      uniqueCaseInsensitive: true,
      trim: true,
      lowercase: true,
      required: true,
      match: [config.emailRegex, 'Incorrect email address.'],
    },
    password: {
      type: String,
      required: [true, 'You must provide password.'],
      minlength: [7, 'Password must be at least 7 characters.'],
    },
    role: {
      type: String,
      default: 'user',
    },
    photos: [{ type: Schema.Types.ObjectId, ref: 'Photo' }],
  },
  // Enable auto timestamps.
  { timestamps: true }
);

// Insert schema plugins.
userSchema.plugin(mongooseUniqueValidator);

// BUSINESS LOGIC.

// Enable finding user by both email and username.
userSchema.statics.findByLogin = async function (
  login: string
): Promise<UserDoc | null> {
  // Try to find by username.
  let user = await User.findOne({ username: login });

  // If not found, try finding by email.
  if (!user) {
    user = await User.findOne({ email: login });
  }

  // Return found user.
  return user;
};

// Create new user.
userSchema.statics.signUp = async function ({
  secret,
  ...newUser
}: UserAttributes): Promise<AuthResult> {
  // Check if user has provided the secret admin pasword correctly.
  if (secret !== config.adminPassword) {
    throw new Error('Cannot sign up, you are not an admin.');
  }

  // Create new user and save it to the database.
  const createdUser = new User(newUser);
  const savedUser = await createdUser.save();

  if (!savedUser) {
    throw new Error('Cannot create new user.');
  }

  // Return new user.
  console.log(
    `(GraphQL) Added user ${createdUser.username} (${createdUser.id}) with email ${createdUser.email}.`
  );

  // Create an auth token.
  const token = createToken(savedUser);

  return { token };
};

// Login user.
userSchema.statics.logIn = async function ({
  login,
  password,
}: LogInArgs): Promise<AuthResult> {
  // Checks if credentials were provided.
  if (!login) {
    throw new Error('You must provide a username.');
  }
  if (!password) {
    throw new Error('You must provide a password.');
  }
  if (password.length < 7) {
    throw new Error('Password must be at least 7 characters.');
  }

  // Try to find by username.
  let user = await User.findOne({ username: login });

  // If not found, try finding by email.
  if (!user) {
    user = await User.findOne({ email: login });
  }

  if (!user) {
    throw new Error(`User '${login}' does not exist.`);
  }

  // Compare passwords.
  const valid = bcrypt.compareSync(password, user.password);

  if (!valid) {
    throw new Error(`The password is invalid.`);
  }

  // Return the toker
  console.log(
    `(GraphQL) Logged in user ${user.username}. The username and password combination is correct.`
  );

  // Create an auth token.
  const token = createToken(user);

  return { token };
};

// Delete a user and cascade delete associated with it photos.
userSchema.statics.deleteUser = async function (
  id: Types.ObjectId
): Promise<UserDoc> {
  // Find and delete user.
  const deletedUser = await User.findByIdAndRemove(id);

  if (!deletedUser) {
    throw new Error('Cannot delete user. User does not exist.');
  }

  // Find and delete user's photos.
  const deletedPhotos = await Photo.deleteMany({ author: id });

  if (!deletedPhotos) {
    throw new Error(`Cannot delete photos of user ${id}`);
  }

  // Return deleted user.
  console.log(
    `(GraphQL) Deleted user ${deletedUser.username} (${deletedUser.id}) and ${deletedPhotos.n} corresponding photos.`
  );
  return deletedUser;
};

// IMPORTANT PASSWORD SECURITY STEP.
// Define a pre event for the save. When the save function is called,
// we will first check to see if the user is being created or changed.
// If the user is not being created or changed, we will
// skip over the hashing part. We don’t want to hash our already hashed data.
userSchema.pre<UserDoc>('save', function (next) {
  if (!this.isModified('password')) {
    return next();
  }
  // Synchronously generates a hash for the given string.
  this.password = bcrypt.hashSync(this.password, 10);
  next();
});

// Create model out of schema.
export const User = model<UserDoc, UserModel>('User', userSchema);
