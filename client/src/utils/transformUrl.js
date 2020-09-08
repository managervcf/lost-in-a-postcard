import { options } from '../options';

// Exports a function that alters cloudinary image based on provided option.
export function transformUrl(url) {
  // If url ends with .gif, don't transform.
  if (/(.gif)$/gi.test(url)) return url;
  // Otherwise, transform an image.
  else {
    // Build new url with all transformation details.
    let transformedUrl = url.replace(
      '/upload',
      `/upload/f_auto,q_${options.image.quality},w_${options.image.width}`
    );
    // Return transformed URL.
    return transformedUrl;
  }
}
