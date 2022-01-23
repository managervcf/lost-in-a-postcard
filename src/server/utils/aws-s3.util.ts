import { S3 } from 'aws-sdk';
import { v1 as uuid } from 'uuid';
import { config } from '../config';
import { GetUploadUrlResult } from '../types';

/**
 * Create a new S3 instance.
 */
const s3 = new S3({
  credentials: {
    accessKeyId: config.s3.accessKeyId,
    secretAccessKey: config.s3.secretAccessKey,
  },
});

const Bucket = config.s3.bucketName;

/**
 * Generates a random AWS Key.
 */
function generateAWSKey(directory: string, country: string, region: string) {
  return `${directory}/${country.toLowerCase().replace(/ /g, '-')}-${
    region ? region.toLowerCase().replace(/ /g, '-') : ''
  }-${uuid()}`;
}

/**
 * Gets a presigned url necessary to perform a file upload.
 * 1. Define the operationName as 'putObject' which is
 *    basically a file upload operation.
 * 2. Pull off the folder name for images.
 * 3. Generate a random key (upload filename).
 * 4. Obtain a signed url from S3.
 * 5. Print out a log to the console.
 * 6. Returns the url along with the key (upload filename).
 */
export async function getUploadUrl(
  country: string,
  region: string,
  type: string
): Promise<GetUploadUrlResult> {
  const operationName = 'putObject';
  const key = generateAWSKey(config.s3.folderName, country, region);
  const params = {
    Bucket,
    ContentType: type,
    Key: key,
  };

  const url = await s3.getSignedUrlPromise(operationName, params);

  console.info(`(AWS S3) Obtained a signed url for ${key}. URL: ${url}`);

  return { url, key };
}

/**
 * Deletes an asset from AWS S3.
 * 1. Define params.
 * 2. Define the result variable.
 * 3. Try to deleteObject using a promise and
 *    assign the result to the result variable.
 * 4. Catch an error and assign it to the result.
 * 5. Return the result.
 */
export async function deletePhoto(
  key: string
): Promise<S3.DeleteObjectOutput | undefined> {
  const params = {
    Bucket,
    Key: key,
  };

  let result: S3.DeleteObjectOutput | undefined = undefined;
  try {
    result = await s3.deleteObject(params).promise();
    console.info(`(AWS S3) Deleted asset ${key}.`);
  } catch (err) {
    console.info(`(AWS S3) Failed to delete asset ${key}.`);
    console.error(`(AWS S3)  ${JSON.stringify(err)}.`);
  }

  return result;
}

/**
 * Deletes multiple assets from AWS S3.
 * 1. Build an Objects array from provided keys.
 * 2. Define params.
 * 3. Define the result variable.
 * 4. Try to deleteObject using a promise and
 *    assign the result to the result variable.
 * 5. Catch an error and assign it to the result.
 * 6. Return the result.
 */
export async function deletePhotos(
  keys: string[]
): Promise<S3.DeleteObjectsOutput | undefined> {
  const Objects = [...keys].map(key => ({ Key: key }));
  const params = {
    Bucket,
    Delete: {
      Objects,
    },
  };

  let result: S3.DeleteObjectsOutput | undefined = undefined;
  try {
    result = await s3.deleteObjects(params).promise();
    console.info(`(AWS S3) Deleted asset ${keys}.`);
  } catch (err) {
    console.info(`(AWS S3) Failed to delete assets ${keys}.`);
    console.error(`(AWS S3) ${JSON.stringify(err)}.`);
  }

  return result;
}

/**
 * Tags an asset.
 * 1. Build the params object.
 * 2. Define the result variable.
 * 3. Try to putObjectTagging using a promise and
 *    assign the result to the result variable.
 * 4. Catch an error and assign it to the result.
 * 5. Return the result.
 */
export async function tagPhotoByCountry(
  key: string,
  tag: string
): Promise<S3.PutObjectTaggingOutput | undefined> {
  const params = {
    Bucket,
    Key: key,
    Tagging: {
      TagSet: [
        {
          Key: 'country',
          Value: tag,
        },
      ],
    },
  };

  let result: S3.PutObjectTaggingOutput | undefined = undefined;
  try {
    result = await s3.putObjectTagging(params).promise();
    console.info(`(AWS S3) Tagged asset ${key}.`);
  } catch (err) {
    console.info(`(AWS S3) Failed to tag asset ${key}.`);
    console.error(`(AWS S3) ${JSON.stringify(err)}.`);
  }

  return result;
}
