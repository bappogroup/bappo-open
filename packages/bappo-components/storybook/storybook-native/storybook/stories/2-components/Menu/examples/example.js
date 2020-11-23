import { Menu, Text, View } from 'bappo-components';
import React from 'react';

const actions = [
  {
    icon: 'home',
    label: 'Home',
    onPress: () => console.log('you pressed Home'),
  },
  {
    label: 'Timer',
    onPress: () => alert('You pressed Timer'),
  },
];

const manyactions = [
  {
    label: 'Action1',
    onPress: () => console.log('You pressed Action1'),
  },
  {
    label: 'Action2',
    onPress: () => console.log('You pressed Action1'),
  },
  {
    label: 'Action3',
    onPress: () => console.log('You pressed Action3'),
  },
  {
    label: 'Action4',
    onPress: () => console.log('You pressed Action4'),
  },
  {
    label: 'Action5',
    onPress: () => console.log('You pressed Action5'),
  },
  {
    label: 'Action6',
    onPress: () => console.log('You pressed Action6'),
  },
  {
    label: 'Action7',
    onPress: () => console.log('You pressed Action7'),
  },
  {
    label: 'Action8',
    onPress: () => console.log('You pressed Action8'),
  },
  {
    label: 'Action9',
    onPress: () => console.log('You pressed Action9'),
  },
];

const actionsNoIcons = [
  {
    label: 'Action1 - No Icon',
    onPress: () => console.log('you pressed Action 1'),
  },
  {
    label: 'Action2 - No Icon',
    onPress: () => console.log('You pressed Timer'),
  },
];

const actionsWide = [
  {
    icon: 'home',
    label: 'Option1, this is 600px wide',
    onPress: () => console.log('you pressed Home'),
  },
  {
    label: 'Option2, this is 600px wide',
    onPress: () => console.log('You pressed Timer'),
  },
];

const MenuExample = () => (
  <View style={outerStyle}>
    <Menu actions={actions} />
    <Menu actions={actionsNoIcons}>
      <View>
        <Text>Custom children</Text>
      </View>
    </Menu>
    <Menu actions={actions} icon="cloud" />
    <Menu actions={actions} icon="menu" align="left" />
    <Menu actions={actionsWide} icon="computer" iconColor="blue" width={600} />
    <Menu actions={manyactions} icon="menu" align="left" />
  </View>
);

export default MenuExample;

const outerStyle = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  backgroundColor: '#f8f8f8',
  padding: 20,
  margin: 20,
};
