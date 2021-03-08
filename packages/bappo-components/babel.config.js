// https://github.com/facebook/create-react-app/blob/v4.0.3/packages/babel-preset-react-app/create.js
const useESModules = process.env.BAPPO_OUTPUT === 'es';

module.exports = {
  presets: [
    [
      require.resolve('babel-preset-react-app'),
      {
        absoluteRuntime: false,
        useESModules,
      },
    ],
  ],
  plugins: [
    require.resolve('babel-plugin-lodash'),
    require.resolve('babel-plugin-styled-components'),
  ],
};
