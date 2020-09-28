import { S3 } from 'aws-sdk';
import { v1 as uuid } from 'uuid';

/**
 * Create a new S3 instance.
 */
const s3 = new S3({
  accessKeyId: process.env.S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
});

/**
 * Gets a presigned url necessary to perform a file upload.
 * 1. Define the operationName as 'putObject' which is
 *    basically a file upload operation.
 * 2. Pull off the folder name for images.
 * 3. Generate a random key (upload filename).
 * 4. Obtain a signed url from S3.
 * 5. Print out a log to the console.
 * 6. Returns the url along with the key (upload filename).
 * @return {{ url: string, key: string }}
 */
export const getUploadUrl = () => {
  const operationName = 'putObject';
  const folder = process.env.S3_FOLDER_NAME;
  const key = `${folder}/${uuid()}.jpeg`;

  const url = s3.getSignedUrl(operationName, {
    Bucket: process.env.S3_BUCKET_NAME,
    ContentType: 'image/jpeg',
    Key: key,
  });

  console.log(`(AWS S3) Obtained a signed url for ${key}`);
  console.log('(AWS S3) Signed url:', url);

  return { url, key };
};
