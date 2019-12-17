import options from '../options';

// Exports a function that alters cloudinary image based on provided option.
export default url => {
  // Transform an image.
  // Build transformation string used in url.
  let transformations = `f_auto,q_${options.image.quality},w_${options.image.width}`;

  // Build new url with all transformation details.
  let transformedUrl = url.replace('/upload', `/upload/${transformations}`);

  // Return transformed URL
  return transformedUrl;
};
