// Backend options.
// Email regex.
export const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
export const requestedPhotosLimit = 5; // Default number of requested photos.
export const jwtExpiryTime = '3h'; // jwt expiry time in a string formats.
export const maxImageSize = 1e7; // Value in bytes.
