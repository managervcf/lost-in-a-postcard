module.exports = {
  // Includes environmental variables inside the .env file.
  setupFiles: ['dotenv/config'],
  // Includes the jest.setup.js file.
  setupFilesAfterEnv: ['./test/jest.setup.js'],
  // Sets the test environment.
  testEnvironment: 'node',
  // Makes logs more verbose.
  verbose: true,
};
