// const { defaults: tsjPreset } = require('ts-jest/presets');
const { jsWithTs: tsjPreset } = require('ts-jest/presets');
// const { jsWithBabel: tsjPreset } = require('ts-jest/presets');

module.exports = {
  setupFiles: ['dotenv/config'], // Includes environmental variables inside the .env file.
  setupFilesAfterEnv: ['<rootDir>/src/test/jest.setup.ts'], // Includes the jest.setup.js file.
  testEnvironment: 'node', // Sets the test environment.
  testPathIgnorePatterns: ['<rootDir>/build/*'], // Excludes the non-compiled test files.
  transform: {
    ...tsjPreset.transform,
  },
  verbose: true, // Makes logs more verbose.
};
