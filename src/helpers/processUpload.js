// Import cloudinary for file uploads.
import cloudinary from 'cloudinary';

export default async ({ file, country }) => {
	// Get metadata from uploading file.
	let { createReadStream, filename, mimetype, encoding } = await file;

	// File validation.
	if (!mimetype.includes('image/')) throw new Error('File must be an image!');

	// Create variable stream.
	const stream = createReadStream();

	// Configure cloudinary API.
	cloudinary.config({
		cloud_name: process.env.CLOUDINARY_NAME,
		api_key: process.env.CLOUDINARY_KEY,
		api_secret: process.env.CLOUDINARY_SECRET
	});

	// Create variable photo.
	let photo = {};

	// Handle upload to cloudinary.
	const cloudinaryUpload = async stream => {
		try {
			await new Promise((resolve, reject) => {
				const streamLoad = cloudinary.v2.uploader.upload_stream(
					{
						// Put file in lostinapostcard folder.
						folder: 'lostinapostcard/',
						// Apply tags.
						tags: [country]
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

	// Upload photo.
	await cloudinaryUpload(stream);

	// Return photo url.
	return photo;
};
