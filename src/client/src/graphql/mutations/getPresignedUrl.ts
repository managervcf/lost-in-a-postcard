import { gql } from 'apollo-boost';

export interface GetPresignedUrlData {
  getPresignedUrl: {
    key: string;
    url: string;
  };
}

export interface GetPresignedUrlVars {
  country: string;
  region: string;
  type: string;
  size: number;
}

export const GET_PRESIGNED_URL = gql`
  mutation getPresignedUrl(
    $country: String!
    $region: String!
    $type: String!
    $size: Int!
  ) {
    getPresignedUrl(country: $country, region: $region, type: $type, size: $size) {
      key
      url
    }
  }
`;
