const path = require('path');
const webpack = require('webpack');

module.exports = ({ config }) => {
  const babelRule = config.module.rules[0];
  babelRule.include.push(
    path.join(__dirname, '../../storybook-native/storybook/data'),
    path.join(__dirname, '../../storybook-native/storybook/stories'),
    path.join(__dirname, '../../storybook-native/storybook/ui-explorer'),
  );

  // https://github.com/storybooks/storybook/issues/5882
  babelRule.use[0].options = {
    babelrc: false,
    cacheDirectory: true,
    presets: [
      [
        require.resolve('@babel/preset-react'),
        {
          useBuiltIns: true,
        },
      ],
      require.resolve('@babel/preset-typescript'),
      require.resolve('@babel/preset-env'),
    ],
    plugins: [
      [require.resolve('@babel/plugin-transform-flow-strip-types'), false],
      require.resolve('@babel/plugin-transform-destructuring'),
      [
        require.resolve('@babel/plugin-proposal-class-properties'),
        {
          loose: true,
        },
      ],
      require.resolve('babel-plugin-styled-components'),
    ],
    overrides: [
      {
        exclude: /\.ts$/,
        plugins: [require.resolve('@babel/plugin-transform-flow-strip-types')],
      },
    ],
  };

  config.resolve.alias = {
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

  return config;
};
