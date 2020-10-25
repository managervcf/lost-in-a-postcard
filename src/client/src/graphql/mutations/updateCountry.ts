import { gql } from 'apollo-boost';

export interface UpdateCountryData {
  updateCountry: {
    id: string;
    name: string;
    description?: string;
  };
}

export interface UpdateCountryVars {
  id: string;
  name: string;
  description?: string;
}

export const UPDATE_COUNTRY = gql`
  mutation updateCountry($id: ID!, $name: String!, $description: String) {
    updateCountry(id: $id, name: $name, description: $description) {
      id
      name
      description
    }
  }
`;
