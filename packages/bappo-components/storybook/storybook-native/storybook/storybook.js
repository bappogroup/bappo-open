import { configure, getStorybookUI } from '@storybook/react-native';
/* eslint-disable global-require */
import React from 'react';
import { AppRegistry, View } from 'react-native';

// import stories
configure(() => {
  require('./stories');
}, module);

// This assumes that storybook is running on the same host as your RN packager,
// to set manually use, e.g. host: 'localhost' option
const StorybookUI = getStorybookUI({
  port: 7007,
  onDeviceUI: true,
  asyncStorage: null,
});
const StorybookUIWrapper = () => (
  <View style={{ paddingTop: 25, flex: 1 }}>
    <StorybookUI />
  </View>
);

AppRegistry.registerComponent('storybooknative', () => StorybookUIWrapper);
export default StorybookUI;
