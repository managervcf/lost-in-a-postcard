// Import cloudinary for file uploads.
import cloudinary from 'cloudinary';
// Import a function from File System nodejs module that allows a file to be sent.
import { createReadStream } from 'fs';
// The problem with js.createReamStream(<path/filename>) is that in the browser
// I don't have access to filepath. Filepath will be fixed to desktop.

// Configure cloudinary API.
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET
});

export const deleteAsset = async public_id => {
  let result = await cloudinary.uploader.destroy(public_id);
  console.log(`(Cloudinary) Deleted asset ${public_id}.`);
};

export const uploadAsset = async ({ file, country }, author) => {
  // Get metadata from uploading file.
  // Not extracting createReadStream function as it throws fs-capacitor error exceeding stack
  // limit when called. Use createReadStream from 'fs' (File System) built-in node module instead.
  let { filename, mimetype, encoding } = await file;
  // File validation.
  if (!mimetype.includes('image/')) throw new Error('File must be an image!');

  // Create filepath essential for createReamStream function.
  // As there is no access to file path in input tag all files will be uploaded from desktop.
  // Temporary solution!
  const filepath = `C:\\Users\\managervcf\\Desktop\\${filename}`;

  // Print file details.
  console.log('<<<< UPLOADED PHOTO >>>>');
  console.log('Filepath =====', filepath);
  console.log('Filename =====', filename);
  console.log('Country =====', country);
	console.log('Author =====', author);
	
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
              photo.url = result.secure_url;
              photo.public_id = result.public_id;
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
        `(Cloudinary) Failed to upload photo! Error:${error.message}`
      );
    }
  };

  // Call function handling upload to cloudinary.
  await cloudinaryUpload(readableStream);

  // Return photo url.
  return photo;
};
