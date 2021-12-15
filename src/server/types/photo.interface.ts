import { Document, Model, Types, PaginateResult, PaginateOptions } from 'mongoose';
import { CountryDoc, UserDoc } from '.';

export interface PhotoAttributes {
  upload: {
    size: number;
    key: string;
  };
  caption?: string;
  featured?: boolean;
  author?: Types.ObjectId;
  country?: Types.ObjectId;
}

export interface PhotoDoc extends Document {
  id: Types.ObjectId;
  upload: {
    size: number;
    key: string;
  };
  caption: string;
  featured: boolean;
  clicks: number;
  createdAt: Date;
  updatedAt: Date;
  country: Types.ObjectId | CountryDoc;
  author: Types.ObjectId | UserDoc;
}

export interface PhotoModel extends Model<PhotoDoc> {
  paginate(
    query: any,
    paginationOptions: PaginateOptions
  ): Promise<PaginateResult<PhotoDoc>>;
}

export interface FindPhotosArgs {
  page?: number;
  limit?: number;
  country?: string;
  featured?: boolean;
}

export interface AddPhotoArgs {
  size: number;
  key: string;
  country: string;
  caption?: string;
  featured?: boolean;
}

export interface UpdatePhotoArgs {
  id: Types.ObjectId;
  caption?: string;
  featured?: boolean;
}
