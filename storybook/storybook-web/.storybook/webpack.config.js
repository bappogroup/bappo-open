const path = require('path');
const webpack = require('webpack');

module.exports = (baseConfig, env, defaultConfig) => {
  defaultConfig.resolve.alias = {
    'bappo-components': path.join(__dirname, '../../../'),
    react: path.join(__dirname, '../../../node_modules/react'),
    'react-dom': path.join(__dirname, '../../../node_modules/react-dom'),
    'react-dom/unstable-native-dependencies': path.join(
      __dirname,
      '../../../node_modules/react-dom/unstable-native-dependencies',
    ),
    'styled-components': path.join(
      __dirname,
      '../../../node_modules/styled-components',
    ),
  };

  return defaultConfig;
};
