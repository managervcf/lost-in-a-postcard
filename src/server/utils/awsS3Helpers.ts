import { S3 } from 'aws-sdk';
import { v1 as uuid } from 'uuid';
import { GetUploadUrlResult } from '../types/upload';

/**
 * Create a new S3 instance.
 */
const s3 = new S3({
  credentials: {
    accessKeyId: process.env.S3_ACCESS_KEY_ID!,
    secretAccessKey: process.env.S3_SECRET_ACCESS_KEY!,
  },
});

const Bucket = process.env.S3_BUCKET_NAME!;

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
export async function getUploadUrl(): Promise<GetUploadUrlResult> {
  const operationName = 'putObject';
  const folder = process.env.S3_FOLDER_NAME;
  const key = `${folder}/${uuid()}.jpeg`;
  const params = {
    Bucket,
    ContentType: 'image/jpeg',
    Key: key,
  };

  const url = await s3.getSignedUrlPromise(operationName, params);

  console.log(`(AWS S3) Obtained a signed url for ${key}. URL: ${url}`);

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
export async function deletePhoto(key: string): Promise<S3.DeleteObjectOutput> {
  const params = {
    Bucket,
    Key: key,
  };

  let result: S3.DeleteObjectOutput;
  try {
    result = await s3.deleteObject(params).promise();
    console.log(`(AWS S3) Deleted asset ${key}.`);
  } catch (err) {
    result = err;
    console.log(`(AWS S3) Failed to delete asset ${key}.`);
    console.log(`(AWS S3)  ${JSON.stringify(err)}.`);
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
): Promise<S3.DeleteObjectsOutput> {
  const Objects = [...keys].map(key => ({ Key: key }));
  const params = {
    Bucket,
    Delete: {
      Objects,
    },
  };

  let result: S3.DeleteObjectsOutput;
  try {
    result = await s3.deleteObjects(params).promise();
    console.log(`(AWS S3) Deleted asset ${keys}.`);
  } catch (err) {
    result = err;
    console.log(`(AWS S3) Failed to delete assets ${keys}.`);
    console.log(`(AWS S3) ${JSON.stringify(err)}.`);
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
): Promise<S3.PutObjectTaggingOutput> {
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

  let result: S3.PutObjectTaggingOutput;
  try {
    result = await s3.putObjectTagging(params).promise();
    console.log(`(AWS S3) Tagged asset ${key}.`);
  } catch (err) {
    result = err;
    console.log(`(AWS S3) Failed to tag asset ${key}.`);
    console.log(`(AWS S3) ${JSON.stringify(err)}.`);
  }

  return result;
}
