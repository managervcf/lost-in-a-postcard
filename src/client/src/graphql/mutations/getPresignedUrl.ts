import { gql } from 'apollo-boost';

export interface GetPresignedUrlData {
  getPresignedUrl: {
    key: string;
    url: string;
  };
}

export interface GetPresignedUrlVars {
  country: string;
  type: string;
  size: number;
}

export const GET_PRESIGNED_URL = gql`
  mutation getPresignedUrl($country: String!, $type: String!, $size: Int!) {
    getPresignedUrl(country: $country, type: $type, size: $size) {
      key
      url
    }
  }
`;
