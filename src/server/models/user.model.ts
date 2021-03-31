import bcrypt from 'bcryptjs';
import { Schema, model } from 'mongoose';
import mongooseUniqueValidator from 'mongoose-unique-validator';
import { config } from '../config';
import { UserDoc, UserModel } from '../types';

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

/**
 * IMPORTANT PASSWORD SECURITY STEP.
 * Define a pre event for the save. When the save function is called,
 * we will first check to see if the user is being created or changed.
 * If the user is not being created or changed, we will
 * skip over the hashing part. We don’t want to hash our already hashed data.
 */
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
