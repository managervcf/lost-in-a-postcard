// Import cloudinary package necessary for file uploads.
import { v2 as cloudinary } from 'cloudinary';

// Import error handler helper.
import { throwError } from './';

// Configure cloudinary API.
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
});

/**
 * Deletes an asset from cloudinary.
 * @param {string} public_id
 * @return {Promise<any>}
 */
export const deleteAsset = async public_id => {
  let res = await cloudinary.uploader.destroy(public_id);
  throwError(!res, `(Cloudinary) Could not delete asset ${public_id}.`);
  console.log(`(Cloudinary) Deleted asset ${public_id}.`);
};

/**
 * Deletes assets from cloudinary by tag name.
 * @param {string} tag
 * @return {Promise<any>}
 */
export const deleteAssetsByTag = async tag => {
  let res = await cloudinary.api.delete_resources_by_tag(tag);
  throwError(!res, `(Cloudinary) Could not delete assets with a tag ${tag}.`);
};

/**
 * Uploads an asset to cloudinary.
 * @param {{ file: object, country: string }} param0
 * @param {string} author
 * @return {Promise<any>}
 */
export const uploadAsset = async ({ file, country }, author) => {
  // Get metadata from uploading file.
  // Not extracting createReadStream function as it throws fs-capacitor error exceeding stack
  // limit when called. Use createReadStream from 'fs' (File System) built-in node module instead.
  const { createReadStream, filename, mimetype, encoding } = await file;

  // File validation.
  throwError(!mimetype.includes('image/'), 'File must be an image!');

  // Create readableStream with provided filepath.
  const readableStream = createReadStream();

  // Create variable photo.
  const photo = {};

  // Define function handling upload to cloudinary.
  const cloudinaryUpload = async stream => {
    try {
      await new Promise((resolve, reject) => {
        const streamLoad = cloudinary.uploader.upload_stream(
          {
            // Put file in the cloudinary folder.
            folder: process.env.CLOUDINARY_FOLDER_NAME,
            // Apply tags.
            tags: [country, author],
          },
          (error, result) => {
            if (result) {
              // Assign details of the uploaded photo to photo object which will be saved in database.
              photo.url = result.secure_url;
              photo.public_id = result.public_id;
              photo.width = result.width;
              photo.height = result.height;
              photo.size = result.bytes;
              console.log(`(Cloudinary) Uploaded new photo at ${photo.url}.`);
              resolve(photo);
            } else {
              reject(error);
            }
          }
        );

        stream.pipe(streamLoad);
      });
    } catch (error) {
      throw new Error(
        `(Cloudinary) Failed to upload photo! Error: ${error.message}`
      );
    }
  };

  // Call function handling upload to cloudinary.
  await cloudinaryUpload(readableStream);

  // Return photo url.
  return photo;
};
