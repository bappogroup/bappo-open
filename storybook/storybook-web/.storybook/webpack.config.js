const path = require('path');
const webpack = require('webpack');
const genDefaultConfig = require('@storybook/react/dist/server/config/defaults/webpack.config.js');

module.exports = (baseConfig, env) => {
  const config = genDefaultConfig(baseConfig, env);

  // config.resolve.alias = {
  //   'bappo-components': path.join(__dirname, '../../../lib'),
  // };

  return config;
};
