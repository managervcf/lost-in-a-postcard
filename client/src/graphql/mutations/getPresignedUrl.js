import gql from 'graphql-tag';

export const GET_PRESIGNED_URL = gql`
  mutation getPresignedUrl($country: String!, $type: String!, $size: Int!) {
    getPresignedUrl(country: $country, type: $type, size: $size) {
      key
      url
    }
  }
`;
