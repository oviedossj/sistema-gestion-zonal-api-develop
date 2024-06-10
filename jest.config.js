/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  clearMocks: true,
  testMatch: ['**/tests/**/*.test.ts'],
  collectCoverageFrom: ['src/**/*.ts'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^@server(.*)$': '<rootDir>/src/server/$1',
    '^@shared(.*)$': '<rootDir>/src/shared/$1',
    '^@incident_report(.*)$': '<rootDir>/src/incident_report/$1',
  },
  coveragePathIgnorePatterns: ['/node_modules/', '/config/', '.*/index.ts$', '.*/app.ts$', '/models/', '/routes/'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
  resetMocks: false,
};
