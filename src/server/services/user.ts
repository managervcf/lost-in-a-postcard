import bcrypt from 'bcryptjs';
import { config } from '../config';
import {
  UserAttributes,
  AuthResult,
  FieldResolver,
  UserDoc,
  LogInArgs,
  UpdateUserArgs,
  PhotoDoc,
} from '../types';
import { createToken } from '../utils';

export abstract class UserService {
  /**
   * Checks the current user.
   */
  static me: FieldResolver<UserDoc> = async (
    parent,
    args,
    { me, models }
  ): Promise<UserDoc | null> => (me ? await models.User.findById(me.id) : null);

  /**
   * Finds all existing user.
   */
  static users: FieldResolver<UserDoc> = async (
    parent,
    args,
    { models }
  ): Promise<UserDoc[]> => await models.User.find({});

  /**
   * Enables finding user by both email and username.
   */
  static userByLogin: FieldResolver<UserDoc, { login: string }> = async (
    parent,
    { login },
    { models }
  ): Promise<UserDoc | null> => {
    // Try to find by username.
    let user = await models.User.findOne({ username: login });

    // If not found, try finding by email.
    if (!user) {
      user = await models.User.findOne({ email: login });
    }

    // Return found user.
    return user;
  };

  /**
   * Signs up a new user.
   */
  static signUp: FieldResolver<UserDoc, UserAttributes> = async (
    parent,
    { secret, ...newUser }: UserAttributes,
    { models }
  ): Promise<AuthResult> => {
    // Check if user has provided the secret admin pasword correctly.
    if (secret !== config.adminPassword) {
      throw new Error('Cannot sign up, you are not an admin.');
    }

    // Create new user and save it to the database.async (parent, args: LogInArgs, { models })
    const createdUser = new models.User(newUser);
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

  /**
   * Logs user in.
   */
  static logIn: FieldResolver<UserDoc, LogInArgs> = async (
    parent,
    { login, password },
    { models }
  ): Promise<AuthResult> => {
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
    let user = await models.User.findOne({ username: login });

    // If not found, try finding by email.
    if (!user) {
      user = await models.User.findOne({ email: login });
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

  /**
   * Updates the user.
   */
  static updateUser: FieldResolver<UserDoc, UpdateUserArgs> = async (
    parent,
    args,
    { me, models }
  ): Promise<UserDoc> => {
    const updatedUser = await models.User.findByIdAndUpdate(me.id, args, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      throw new Error(`Cannot update a user with an id ${me.id}`);
    }

    return updatedUser;
  };

  /**
   * Deletes the user.
   */
  static deleteUser: FieldResolver<UserDoc> = async (
    parent,
    args,
    { me, models }
  ): Promise<UserDoc | null> => {
    // Find and delete user.
    const deletedUser = await models.User.findByIdAndRemove(me.id);

    if (!deletedUser) {
      throw new Error('Cannot delete user. User does not exist.');
    }

    // Find and delete user's photos.
    const deletedPhotos = await models.Photo.deleteMany({ author: me.id });

    if (!deletedPhotos) {
      throw new Error(`Cannot delete photos of user ${me.id}`);
    }

    // Return deleted user.
    console.log(
      `(GraphQL) Deleted user ${deletedUser.username} (${deletedUser.id}) and ${deletedPhotos.n} corresponding photos.`
    );
    return deletedUser;
  };

  /**
   * Finds user's photos.
   */
  static photos: FieldResolver<UserDoc> = async (
    { id },
    args,
    { models }
  ): Promise<PhotoDoc[]> => await models.Photo.find({ author: id });
}
