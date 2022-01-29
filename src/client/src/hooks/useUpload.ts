import axios from 'axios';
import { useState } from 'react';
import { useMutation } from 'react-apollo';
import { FETCH_LIMIT } from '../constants';
import {
  AddPhotoData,
  AddPhotoVars,
  ADD_PHOTO,
  GetPresignedUrlData,
  GetPresignedUrlVars,
  GET_PRESIGNED_URL,
  PHOTOS,
} from '../graphql';

/**
 * Arguments necessary to upload a file to AWS S3.
 */
interface FileUploadArgs {
  file: {
    type: string;
    size: number;
  };
  region: string;
  country: string;
  caption: string;
  featured: boolean;
}

/**
 * Upload hook.
 * 1. Use mutation hooks to get the presigned url and to add a new photo.
 * 2. Define the loading and error state variables.
 * 3. Access the apollo store.
 * 4. Define the uploadToS3 function.
 */
export const useUpload = () => {
  const [getSignedUrl, { error: getUrlError }] = useMutation<
    GetPresignedUrlData,
    GetPresignedUrlVars
  >(GET_PRESIGNED_URL);
  const [addPhoto, { error: uploadError }] = useMutation<AddPhotoData, AddPhotoVars>(
    ADD_PHOTO,
    {
      refetchQueries: [{ query: PHOTOS, variables: { limit: FETCH_LIMIT } }],
    }
  );

  const [loading, setLoading] = useState(false);

  /**
   * Uploads the photo to the AWS S3 and adds it to the database.
   * 1. Set the loading variable to true (start of the upload process).
   * 2. Obtain a presigned url from S3 via the getPresignedUrl mutation.
   *    Provide default variables if the file is not selected.
   * 3. Try to upload the asset to S3. If failed, set the error variable to
   *    the error that has just occured, set loading to false
   *    and immediately throw said error.
   * 4. Add a new photo to the database via the addPhoto mutation.
   * 5. Set the loading variable to false (end of the upload process).
   * 6. Return the newly created photo.
   */
  const uploadToS3 = async ({
    file,
    country,
    region,
    caption,
    featured,
  }: FileUploadArgs) => {
    setLoading(true);

    try {
      const { data } = await getSignedUrl({
        variables: {
          country,
          region,
          type: file?.type ?? '',
          size: file?.size ?? 0,
        },
      });

      if (!data) {
        throw new Error('Cannot get the signed url');
      }

      const { key, url } = data?.getPresignedUrl;

      await axios.put(url, file, {
        headers: {
          'Content-Type': file.type,
        },
      });

      const newPhoto = await addPhoto({
        variables: { country, region, caption, featured, key, size: file.size },
      });

      console.log('(Info) Added a new photo:', newPhoto);
      return newPhoto;
    } catch (err) {
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { uploadToS3, loading, getUrlError, uploadError };
};
