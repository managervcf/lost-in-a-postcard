module.exports = {
  preset: 'ts-jest', // Sets the preset.
  setupFiles: ['dotenv/config'], // Includes environmental variables inside the .env file.
  testPathIgnorePatterns: ['./src/test/*'], // Excludes the non-compiled test files.
  setupFilesAfterEnv: ['./dist/test/jest.setup.js'], // Includes the jest.setup.js file.
  testEnvironment: 'node', // Sets the test environment.
  verbose: true, // Makes logs more verbose.
};
