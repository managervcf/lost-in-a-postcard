import { Document, Model, Types } from 'mongoose';
import { PhotoDoc } from './';

export interface CountryAttributes {
  name: string;
  description?: string;
}

export interface CountryDoc extends Document {
  id: Types.ObjectId;
  name: string;
  description?: string;
  photos: (Types.ObjectId | PhotoDoc)[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CountryModel extends Model<CountryDoc> {}

export interface UpdateCountryArgs {
  id: Types.ObjectId;
  name: string;
  description: string;
}
