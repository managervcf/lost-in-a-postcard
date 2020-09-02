// Backend options.
// Email regex.
export const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const maxFileSize = 30000000; // Max upload size in bytes.
export const maxFiles = 50; // Number of files sent at once.
export const cloudinaryFolderName = 'lostinapostcard/'; // Cloudinary upload destination folder.
export const requestedPhotosLimit = 30; // Default number of requested photos.
