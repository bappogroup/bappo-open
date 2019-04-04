import React from 'react';
import { Dropdown, styled, Background, View, Text } from 'bappo-components';

const actions = [
  {
    icon: 'home',
    label: 'Home',
    onPress: () => console.log('you pressed Home'),
  },
  {
    icon: 'timer',
    label: 'Timer',
    onPress: () => console.log('you pressed Timer'),
  },
];

const actionsNoIcons = [
  {
    label: 'Action1 - No Icon',
    onPress: () => console.log('you pressed Action 1'),
  },
  {
    label: 'Action2 - No Icon',
    onPress: () => console.log('you pressed Timer'),
  },
];

const actionsWide = [
  {
    icon: 'home',
    label: 'Option1, this is 600px wide',
    onPress: () => console.log('you pressed Home'),
  },
  {
    icon: 'timer',
    label: 'Option2, this is 600px wide',
    onPress: () => console.log('you pressed Timer'),
  },
];

const DropdownExample = () => (
  <View style={outerStyle}>
    <Dropdown actions={actions} />
    <Dropdown actions={actionsNoIcons} icon="accessibility" />
    <Dropdown actions={actions} icon="cloud" />
    <Dropdown actions={actions} icon="menu" align="left" />
    <Dropdown actions={actionsWide} icon="computer" width={600} />
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
