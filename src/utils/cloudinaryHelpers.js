// Import cloudinary package necessary for file uploads.
import cloudinary from 'cloudinary';
// Import a function from File System nodejs module that allows a file to be sent.
// The problem with js.createReamStream(<path/filename>) is that in the browser
// there is np access to file path. File path will be temporarily fixed to desktop.
import { createReadStream } from 'fs';

// Import error handler helper.
import { throwError } from './';

// Configure cloudinary API.
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

// Deletes an asset from cloudinary cloud.
export const deleteAsset = async public_id => {
  let result = await cloudinary.uploader.destroy(public_id);
  throwError(!result, `(Cloudinary) Could not delete asset ${public_id}.`);
  console.log(`(Cloudinary) Deleted asset ${public_id}.`);
};

// Uploades an asset to cloudinary cloud.
export const uploadAsset = async ({ file, country }, author) => {
  // Get metadata from uploading file.
  // Not extracting createReadStream function as it throws fs-capacitor error exceeding stack
  // limit when called. Use createReadStream from 'fs' (File System) built-in node module instead.
  let { filename, mimetype, encoding } = await file;

  // File validation.
  throwError(!mimetype.includes('image/'), 'File must be an image!');

  // Create filepath essential for createReamStream function.
  // As there is no access to file path in input tag all files will be uploaded from desktop.
  // Temporary solution!
  const filepath = `C:\\Users\\managervcf\\Desktop\\${filename}`;

  // Create readableStream with provided filepath.
  const readableStream = createReadStream(filepath);

  // Create variable photo.
  let photo = {};

  // Define function handling upload to cloudinary.
  const cloudinaryUpload = async stream => {
    try {
      await new Promise((resolve, reject) => {
        const streamLoad = cloudinary.v2.uploader.upload_stream(
          {
            // Put file in lostinapostcard folder.
            folder: 'lostinapostcard/',
            // Apply tags.
            tags: [country, author]
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
