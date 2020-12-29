import bcrypt from 'bcryptjs';
import { Types } from 'mongoose';
import { config } from '../config';
import {
  UserAttributes,
  AuthResult,
  UserDoc,
  LogInArgs,
  UpdateUserArgs,
  PhotoDoc,
  Context,
} from '../types';
import { createToken } from '../utils';

export abstract class UserService {
  /**
   * Checks the current user.
   */
  static async getMe({ me, models }: Context): Promise<UserDoc | null> {
    return me ? await models.User.findById(me.id) : null;
  }

  /**
   * Finds all existing user.
   */
  static async getUsers(models: Context['models']): Promise<UserDoc[]> {
    return await models.User.find({});
  }

  /**
   * Enables finding user by both email and username.
   */
  static async getUserByLogin(
    login: string,
    models: Context['models']
  ): Promise<UserDoc | null> {
    // Try to find by username.
    let user = await models.User.findOne({ username: login });

    // If not found, try finding by email.
    if (!user) {
      user = await models.User.findOne({ email: login });
    }

    // Return found user.
    return user;
  }

  /**
   * Signs up a new user.
   */
  static async signUp(
    { secret, ...newUser }: UserAttributes,
    models: Context['models']
  ): Promise<AuthResult> {
    // Check if user has provided the secret admin pasword correctly.
    if (secret !== config.adminPassword) {
      throw new Error(
        `Cannot sign up, you are not an admin. Secret '${secret}' is incorrect`
      );
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
  }

  /**
   * Logs user in.
   */
  static async logIn(
    { login, password }: LogInArgs,
    models: Context['models']
  ): Promise<AuthResult> {
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
    console.log(`(GraphQL) Logged in as ${user.username}.`);

    // Create an auth token.
    const token = createToken(user);

    return { token };
  }

  /**
   * Updates the user.
   */
  static async updateUser(
    args: UpdateUserArgs,
    { me, models }: Context
  ): Promise<UserDoc> {
    const updatedUser = await models.User.findByIdAndUpdate(me.id, args, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      throw new Error(`Cannot update a user with an id '${me.id}'`);
    }

    return updatedUser;
  }

  /**
   * Deletes the user.
   */
  static async deleteUser({ me, models }: Context): Promise<UserDoc | null> {
    // Find and delete user.
    const deletedUser = await models.User.findByIdAndRemove(me.id);

    if (!deletedUser) {
      throw new Error(
        `Cannot delete user. User with an id '${me.id}' does not exist`
      );
    }

    // Find and delete user's photos.
    const deletedPhotos = await models.Photo.deleteMany({ author: me.id });

    if (!deletedPhotos) {
      throw new Error(`Cannot delete photos of user '${me.id}'`);
    }

    // Return deleted user.
    console.log(
      `(GraphQL) Deleted user ${deletedUser.username} (${deletedUser.id}) and ${deletedPhotos.n} corresponding photos.`
    );
    return deletedUser;
  }

  /**
   * Finds user's photos.
   */
  static async getPhotos(
    id: Types.ObjectId,
    models: Context['models']
  ): Promise<PhotoDoc[]> {
    return await models.Photo.find({ author: id });
  }
}
