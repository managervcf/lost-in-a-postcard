/**
 * Arguments necessary to upload a file to AWS S3.
 */
export interface FileUploadArgs {
  file: {
    type: string;
    size: number;
  };
  country: string;
  caption: string;
  featured: boolean;
}
