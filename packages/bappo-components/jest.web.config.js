const jestConfig = require('kcd-scripts/config').jest;

module.exports = Object.assign(jestConfig, {
  testMatch: ['**/__tests__/**/*.web.(js|jsx|ts|tsx)'],
  transform: {
    '\\.(ts|tsx)$': 'ts-jest',
  },
});
