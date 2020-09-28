import gql from 'graphql-tag';

export const GET_PRESIGNED_URL = gql`
  mutation getPresignedUrl {
    getPresignedUrl {
      key
      url
    }
  }
`;
