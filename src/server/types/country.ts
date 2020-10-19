import { Document, Model, Types } from 'mongoose';

export interface CountryAttributes {
  name: string;
  description?: string;
}

export interface CountryDoc extends Document {
  id: Types.ObjectId;
  name: string;
  description?: string;
  photos: Types.ObjectId[];
  createdAt: Date;
  updatedAt: Date;
}

export interface CountryModel extends Model<CountryDoc> {
  updateCountry({
    id,
    name,
    description,
  }: UpdateCountryArgs): Promise<CountryDoc | null>;
}

export interface UpdateCountryArgs {
  id: Types.ObjectId;
  name: string;
  description: string;
}
