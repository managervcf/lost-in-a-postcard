/**
 * @interface testUser
 */
export const testUser = {
  username: 'johndoe',
  email: 'john@doe.com',
  password: 'password',
  role: 'test',
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
