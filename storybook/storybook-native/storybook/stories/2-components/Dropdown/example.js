import React from 'react';
import { Dropdown, styled, Background, View, Text } from 'bappo-components';

const actions = [
  {
    icon: 'home',
    label: 'Home',
    onPress: () => console.log('you pressed Home'),
  },
  {
    label: 'Timer',
    onPress: () => console.log('you pressed Timer'),
  },
];

const DropdownExample = () => (
  <View style={outerStyle}>
    <Dropdown actions={actions} />
    <Dropdown actions={actions} icon="accessibility" />
  </View>
);

export default DropdownExample;

const outerStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  backgroundColor: '#f8f8f8',
  padding: 20,
  margin: 20,
};
