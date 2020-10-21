import { config } from '../config';
import { models } from '../models';
import {
  FieldResolver,
  GetPresignedUrlArgs,
  GetUploadUrlResult,
} from '../types';
import { getUploadUrl } from '../utils';

export class UploadService {
  /**
   * Obtains a signed url from the AWS S3.
   * 1. Validate inputs.
   * 2. Obtain the signed url.
   */
  static getPresignedUrl: FieldResolver<
    typeof models,
    GetPresignedUrlArgs
  > = async (
    parent,
    { country, type, size },
    context
  ): Promise<GetUploadUrlResult> => {
    // Input validation check.
    if (!country) {
      throw new Error('Must provide a country name');
    }
    if (country.length < 3) {
      throw new Error('Country name must contain at least 3 characters');
    }
    if (!type) {
      throw new Error('Must upload a file');
    }
    if (!type.match(/image\/jpeg/gi)) {
      throw new Error('File type must be of image/jpeg');
    }
    if (!size || size === 0) {
      throw new Error('Must upload a file');
    }
    if (size > config.maxImageSize) {
      throw new Error(
        `File size cannot exceed ${config.maxImageSize / 1000000} MB`
      );
    }

    return await getUploadUrl();
  };
}
