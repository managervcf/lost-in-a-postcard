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

export interface UserModel extends Model<UserDoc> {}

export interface LogInArgs {
  login: string;
  password: string;
}

export interface UpdateUserArgs {
  id: Types.ObjectId;
  username: string;
  email: string;
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
