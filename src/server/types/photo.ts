import {
  Document,
  Model,
  Types,
  PaginateResult,
  PaginateOptions,
} from 'mongoose';
import { CountryDoc, CurrentUser, UserDoc } from './';

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

export interface PhotoBaseDoc extends Document {
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
}

export interface PhotoDoc extends PhotoBaseDoc {
  country: Types.ObjectId;
  author: Types.ObjectId;
}

export interface PhotoPopulatedDoc extends PhotoBaseDoc {
  country: CountryDoc | null;
  author: UserDoc | null;
}

export interface PhotoModel extends Model<PhotoDoc> {
  paginate(
    query: any,
    paginationOptions: PaginateOptions
  ): Promise<PaginateResult<PhotoDoc>>;
  findPhotos(args: FindPhotosArgs): Promise<PaginateResult<PhotoDoc>>;
  findPopulated(id: Types.ObjectId): Promise<PhotoPopulatedDoc>;
  getPresignedUrl(args: GetPresignedUrlArgs): Promise<getPresignedUrlResult>;
  addPhoto(me: CurrentUser, args: AddPhotoArgs): Promise<PhotoDoc>;
  deletePhoto(id: Types.ObjectId): Promise<PhotoPopulatedDoc>;
  clickPhoto(id: Types.ObjectId): Promise<PhotoDoc>;
}

export interface GetPresignedUrlArgs {
  country: string;
  type: string;
  size: number;
}

export interface getPresignedUrlResult {
  url: string;
  key: string;
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
