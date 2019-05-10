const path = require('path');
const webpack = require('webpack');

module.exports = (baseConfig, env, defaultConfig) => {
  const babelRule = defaultConfig.module.rules[0];
  babelRule.include.push(
    path.join(__dirname, '../../storybook-native/storybook/data'),
    path.join(__dirname, '../../storybook-native/storybook/stories'),
    path.join(__dirname, '../../storybook-native/storybook/ui-explorer'),
  );

  defaultConfig.resolve.alias = {
    '@storybook/react-native': path.join(
      __dirname,
      '../node_modules/@storybook/react',
    ),
    // only use the following for development
    // 'bappo-components': path.join(__dirname, '../../../'),
    // react: path.join(__dirname, '../../../node_modules/react'),
    // 'react-dom': path.join(__dirname, '../../../node_modules/react-dom'),
    // 'react-dom/unstable-native-dependencies': path.join(
    //   __dirname,
    //   '../../../node_modules/react-dom/unstable-native-dependencies',
    // ),
    // 'styled-components': path.join(
    //   __dirname,
    //   '../../../node_modules/styled-components',
    // ),
  };

  return defaultConfig;
};
