/**
 * @interface testUser
 */
export const testUser = {
  username: 'johndoe',
  email: 'john@doe.com',
  password: 'password',
  role: 'admin',
  secret: process.env.ADMIN_PASSWORD,
};

/**
 * @interface testPhoto
 */
export const testPhoto = {
  file: `${__dirname}/test-image.jpg`,
  country: 'test-country',
  caption: 'test-caption',
  featured: true,
};

/**
 * @interface testPhotoEdited
 */
export const testPhotoEdited = {
  file: `${__dirname}/test-image.jpg`,
  country: 'test-country-edited',
  caption: 'test-caption-edited',
  featured: true,
};

/**
 * @interface testCountry
 */
export const testCountry = {
  name: testPhoto.country,
  description: 'test-description',
};

/**
 * @interface testCountryEdited
 */
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
