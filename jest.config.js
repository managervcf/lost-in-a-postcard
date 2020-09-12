module.exports = {
  // Includes environmental variables inside the .env file.
  setupFiles: ['dotenv/config'],
  // Includes the jest.setup.js file.
  setupFilesAfterEnv: ['./test/jest.setup.js'],
  testEnvironment: 'node',
  verbose: true,
};
