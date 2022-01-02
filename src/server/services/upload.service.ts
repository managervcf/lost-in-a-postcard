import { config } from '../config';
import { getUploadUrl } from '../utils';
import { GetPresignedUrlArgs, GetUploadUrlResult } from '../types';

class UploadService {
  /**
   * Obtains a signed url from the AWS S3.
   * 1. Validate inputs.
   * 2. Obtain the signed url.
   */
  async getPresignedUrl({
    country,
    region,
    type,
    size,
  }: GetPresignedUrlArgs): Promise<GetUploadUrlResult> {
    // Input validation check.
    if (!country) {
      throw new Error('Must provide a country name');
    }
    if (country.trim().length < 3) {
      throw new Error(
        `Country name '${country}' has a length of ${country.length} and is not a valid name. It must contain at least 3 characters`
      );
    }

    // Trim the country name.
    country = country.trim();

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
        `File size cannot exceed ${config.maxImageSize / 1e6} MB. Provided file size ${
          size / 1e6
        } MB`
      );
    }

    return await getUploadUrl(country, region);
  }
}

export const uploadService = new UploadService();
