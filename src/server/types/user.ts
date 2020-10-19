import { Document, Model, Types } from 'mongoose';

export interface UserAttributes {
  username: string;
  password: string;
  secret: string;
  email: string;
}

export interface UserDoc extends Document {
  id: Types.ObjectId;
  username: string;
  password: string;
  secret: string;
  email: string;
  role: string;
  photos: Types.ObjectId[] | [];
  createdAt: Date;
  updatedAt: Date;
}

export interface UserModel extends Model<UserDoc> {
  findByLogin(login: string): Promise<UserDoc | null>;
  signUp(newUser: UserAttributes): Promise<AuthResult>;
  logIn({ login, password }: LogInArgs): Promise<AuthResult>;
  deleteUser(id: Types.ObjectId): Promise<UserDoc>;
}

export interface LogInArgs {
  login: string;
  password: string;
}

export interface CurrentUser {
  id: Types.ObjectId;
  username: string;
  email: string;
  role: string;
}

export type AuthResult = {
  token: string | null;
};
