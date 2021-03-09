const path = require('path');
const webpack = require('webpack');

module.exports = ({ config, mode }) => {
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

  prdConfig = {
    '@babel/runtime': path.join(__dirname, '../node_modules/@babel/runtime'),
    '@storybook/react-native': path.join(
      __dirname,
      '../node_modules/@storybook/react',
    ),
    react: path.join(__dirname, '../node_modules/react'),
    'react-dom': path.join(__dirname, '../node_modules/react-dom'),
    'styled-components': path.join(
      __dirname,
      '../node_modules/styled-components',
    ),
  };

  devConfig = {
    'bappo-components': path.join(__dirname, '../../../'),
  };

  if (mode === 'DEVELOPMENT') {
    config.resolve.alias = { ...prdConfig, ...devConfig };
  } else {
    config.resolve.alias = { ...prdConfig };
  }
  // console.log('config.resolve.alias: ', config.resolve.alias);

  return config;
};
