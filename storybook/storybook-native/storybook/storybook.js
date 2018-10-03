/* eslint-disable global-require */
import React from 'react';
import { AppRegistry, View } from 'react-native';
import { getStorybookUI, configure } from '@storybook/react-native';

// import stories
configure(() => {
  require('./stories');
}, module);

// This assumes that storybook is running on the same host as your RN packager,
// to set manually use, e.g. host: 'localhost' option
const StorybookUI = getStorybookUI({ port: 7007, onDeviceUI: true });
const StorybookUIWrapper = () => (
  <View style={{ paddingTop: 15, flex: 1 }}>
    <StorybookUI />
  </View>
);

AppRegistry.registerComponent('example', () => StorybookUIWrapper);
export default StorybookUI;
