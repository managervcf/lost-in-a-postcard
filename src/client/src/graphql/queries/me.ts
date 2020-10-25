import { gql } from 'apollo-boost';

export interface MeData {
  me: {
    id: string;
    username: string;
    email: string;
  };
}

export const ME = gql`
  query me {
    me {
      id
      username
      email
    }
  }
`;
