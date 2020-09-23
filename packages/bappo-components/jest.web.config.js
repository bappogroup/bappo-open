const jestConfig = require('@bappo/scripts/config').jest;

module.exports = Object.assign(jestConfig, {
  preset: 'ts-jest/presets/js-with-babel',
  testMatch: ['**/__tests__/**/*.web.(js|jsx|ts|tsx)'],
  transform: {
    '\\.(ts|tsx)$': 'ts-jest',
  },
  globals: {
    'ts-jest': {
      diagnostics: false,
      tsConfig: {
        allowJs: true,
      },
    },
  },
});
