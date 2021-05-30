export interface GetUploadUrlResult {
  url: string;
  key: string;
}

export interface getPresignedUrlResult extends GetUploadUrlResult {}

export interface GetPresignedUrlArgs {
  country: string;
  type: string;
  size: number;
}
