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
}

export interface UserModel extends Model<UserDoc> {
  findByLogin(login: UserDoc['username']): Promise<UserDoc | null>;
  signUp(newUser: UserAttributes): Promise<AuthResult>;
  logIn({ login, password }: LogInArgs): Promise<AuthResult>;
  deleteUser(id: UserDoc['id']): Promise<UserDoc>;
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
