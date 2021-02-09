/**
 * Metro configuration for React Native
 * https://github.com/facebook/react-native
 *
 * @format
 */
const blacklist = require('metro-config/src/defaults/blacklist');
const path = require('path');

module.exports = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
  watchFolders: [path.resolve(__dirname, '../../')],
  resolver: {
    extraNodeModules: {
      'bappo-components': path.join(__dirname, '../../'),

      // redirect imports by other projects to this project as we only want
      // one copy of these libs
      react: path.join(__dirname, 'node_modules/react'),
      'react-native': path.join(__dirname, 'node_modules/react-native'),
      'styled-components': path.join(
        __dirname,
        'node_modules/styled-components',
      ),
    },
    blacklistRE: blacklist([
      /bappo-components\/node_modules\/react\/.*/,
      /bappo-components\/node_modules\/react-native\/.*/,
      /bappo-components\/node_modules\/styled-components\/.*/,
    ]),
  },
};
