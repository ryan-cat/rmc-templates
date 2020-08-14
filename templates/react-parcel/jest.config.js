module.exports = {
  preset: 'ts-jest',
  collectCoverage: true,
  moduleDirectories: ['node_modules', 'utils', __dirname],
  moduleNameMapper: {
    '\\.(jpg|ico|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': '<rootDir>/src/__mocks__/fileMock.js'
  },
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  reporters: ['default'],
  coverageReporters: ['json', 'lcov', 'text', 'clover', 'cobertura']
};
