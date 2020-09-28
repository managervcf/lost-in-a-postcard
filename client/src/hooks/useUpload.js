import { useState } from 'react';
import { useMutation, useApolloClient } from 'react-apollo';
import axios from 'axios';
import { ADD_PHOTO } from '../graphql/mutations/addPhoto';
import { GET_PRESIGNED_URL } from '../graphql/mutations';

/**
 * Upload hook.
 * @returns {{
 *  uploadToS3: uploadToS3,
 *  loading: boolean,
 *  error: Error | null
 * }}
 */
export const useUpload = () => {
  // Use mutation hooks to get the presigned url and to add a new photo.
  const [getSignedUrl, { error: urlError }] = useMutation(GET_PRESIGNED_URL);
  const [addPhoto, { error: uploadError }] = useMutation(ADD_PHOTO, {
    onCompleted: () => client.resetStore(),
  });

  // Define the loading and error state variables.
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(urlError || uploadError);

  // Access the apollo store.
  const client = useApolloClient();

  /**
   * Uploads the photo to the AWS S3 and adds it to the database.
   * 1. Set the loading variable to true (start of the upload process).
   * 2. Obtain a presigned url from S3 via the getPresignedUrl mutation.
   * 3. Try to upload the asset to S3. If failed, set the error variable to
   *    the error that has just occured and immediately throw said error.
   * 4. Add a new photo to the database via the addPhoto mutation.
   * 5. Set the loading variable to false (end of the upload process).
   * 6. Return the newly created photo.
   * @param {{ file: object, country: string, caption: string, featured: boolean }} param0
   * @returns {Promise<{
   *  id: string,
   *  country: {
   *    name: string,
   *    description: string,
   *  },
   *  upload: {
   *    url: string,
   *    key: string,
   *  }
   * }>}
   */
  const uploadToS3 = async ({ file, country, caption, featured }) => {
    setLoading(true);

    const result = await getSignedUrl();
    const { key, url } = result.data.getPresignedUrl;

    try {
      await axios.put(url, file, { headers: { 'Content-Type': file.type } });
    } catch (err) {
      setError(error);
      throw err;
    }

    const newPhoto = await addPhoto({
      variables: { file, country, caption, featured, key },
    });

    console.log('(Upload) Added a new photo:', newPhoto);

    setLoading(false);
    return newPhoto;
  };

  return { uploadToS3, loading, error };
};
