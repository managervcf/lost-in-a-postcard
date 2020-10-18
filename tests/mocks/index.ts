import { config } from '../../src/server/config';

export const testUser = {
  username: 'johndoe',
  email: 'john@doe.com',
  password: 'password',
  role: 'admin',
  secret: config.adminPassword,
};

export const testPhoto = {
  file: `${__dirname}/test-image.jpg`,
  country: 'test-country',
  caption: 'test-caption',
  featured: true,
};

export const testPhotoEdited = {
  file: `${__dirname}/test-image.jpg`,
  country: 'test-country-edited',
  caption: 'test-caption-edited',
  featured: true,
};

export const testCountry = {
  name: testPhoto.country,
  description: 'test-description',
};

export const testCountryEdited = {
  name: testPhotoEdited.country,
  description: 'test-description-edited',
};

export const SIGNUP = `
  mutation signUp(
    $username: String!
    $email: String!
    $password: String!
    $secret: String!
    $role: String
  ) {
    signUp(
      username: $username
      email: $email
      password: $password
      secret: $secret
      role: $role
    ) {
      token
    }
  }
`;

export const DELETE_PHOTO = `
  mutation deletePhoto($id: ID!) {
    deletePhoto(id: $id) {
      id
      country {
        name
      }
    }
  }
`;
