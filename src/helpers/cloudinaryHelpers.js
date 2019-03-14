// Import cloudinary for file uploads.
import cloudinary from 'cloudinary';

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
	let { createReadStream, filename, mimetype, encoding } = await file;

	// File validation.
	if (!mimetype.includes('image/')) throw new Error('File must be an image!');

	// Create variable stream.
	const stream = createReadStream();

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

	// Upload photo.
	await cloudinaryUpload(stream);

	// Return photo url.
	return photo;
};
