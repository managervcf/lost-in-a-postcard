import { gql } from 'apollo-boost';

export const LOGIN = gql`
  mutation logIn($login: String!, $password: String!) {
    logIn(login: $login, password: $password) {
      token
    }
  }
`;
