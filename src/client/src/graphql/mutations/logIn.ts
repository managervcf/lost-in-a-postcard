import { gql } from 'apollo-boost';

export interface LoginData {
  logIn: {
    token: string;
  };
}

export interface LoginVars {
  login: string;
  password: string;
}

export const LOGIN = gql`
  mutation logIn($login: String!, $password: String!) {
    logIn(login: $login, password: $password) {
      token
    }
  }
`;
