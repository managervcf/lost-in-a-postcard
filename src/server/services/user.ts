import bcrypt from 'bcryptjs';
import { Types } from 'mongoose';
import { Photo, User } from '../models';
import { config } from '../config';
import { createToken } from '../utils';
import {
  UserAttributes,
  AuthResult,
  UserDoc,
  LogInArgs,
  UpdateUserArgs,
  PhotoDoc,
  Context,
  UserModel,
  PhotoModel,
} from '../types';

class UserService {
  constructor(private userModel: UserModel, private photoModel: PhotoModel) {}
  /**
   * Checks the current user.
   */
  async getMe(me: Context['me']): Promise<UserDoc | null> {
    return me ? await this.userModel.findById(me.id) : null;
  }

  /**
   * Finds all existing user.
   */
  async getUsers(): Promise<UserDoc[]> {
    return await this.userModel.find({});
  }

  /**
   * Enables finding user by both email and username.
   */
  async getUserByLogin(login: string): Promise<UserDoc | null> {
    // Try to find by username.
    let user = await this.userModel.findOne({ username: login });

    // If not found, try finding by email.
    if (!user) {
      user = await this.userModel.findOne({ email: login });
    }

    // Return found user.
    return user;
  }

  /**
   * Signs up a new user.
   */
  async signUp({ secret, ...newUser }: UserAttributes): Promise<AuthResult> {
    // Check if user has provided the secret admin pasword correctly.
    if (secret !== config.adminPassword) {
      throw new Error(
        `Cannot sign up, you are not an admin. Secret '${secret}' is incorrect`
      );
    }

    // Create new user and save it to the database.
    const createdUser = new this.userModel(newUser);
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
  async logIn({ login, password }: LogInArgs): Promise<AuthResult> {
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
    let user = await this.userModel.findOne({ username: login });

    // If not found, try finding by email.
    if (!user) {
      user = await this.userModel.findOne({ email: login });
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
  async updateUser(args: UpdateUserArgs, me: Context['me']): Promise<UserDoc> {
    const updatedUser = await this.userModel.findByIdAndUpdate(me.id, args, {
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
  async deleteUser(me: Context['me']): Promise<UserDoc | null> {
    // Find and delete user.
    const deletedUser = await this.userModel.findByIdAndRemove(me.id);

    if (!deletedUser) {
      throw new Error(
        `Cannot delete user. User with an id '${me.id}' does not exist`
      );
    }

    // Find and delete user's photos.
    const deletedPhotos = await this.photoModel.deleteMany({
      author: me.id,
    });

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
  async getPhotos(id: Types.ObjectId): Promise<PhotoDoc[]> {
    return await this.photoModel.find({ author: id });
  }
}

export const userService = new UserService(User, Photo);
