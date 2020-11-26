import { Menu, Text, View } from 'bappo-components';
import React from 'react';

const MenuExample = () => (
  <View style={outerStyle}>
    <Menu minWidth={200}>
      <Menu.CloseButton />
      <Menu.Item
        icon="home"
        label="Home"
        onPress={() => console.log('you pressed Home')}
      />
      <View
        style={{
          backgroundColor: 'gray',
          width: '200px',
          height: '5px',
          margin: 0,
        }}
      ></View>
      <Menu.Item label="Timer" onPress={() => alert('You pressed Timer')} />
    </Menu>
    <Menu
      trigger={
        <View>
          <Text>Custom children</Text>
        </View>
      }
    >
      <Menu.Item
        label="Action 1 - No Icon"
        onPress={() => alert('You pressed Action 1 - No Icon')}
      />
      <Menu.Item
        label="Action 2 - No Icon"
        onPress={() => alert('You pressed Action 2 - No Icon')}
      />
    </Menu>
    <Menu icon="cloud" align="right">
      <Menu.Item
        icon="home"
        label="Home"
        onPress={() => console.log('you pressed Home')}
      />
      <Menu.Item label="Timer" onPress={() => alert('You pressed Timer')} />
    </Menu>
    <Menu icon="menu">
      <Menu.Item
        icon="home"
        label="Home"
        onPress={() => console.log('you pressed Home')}
      />
      <Menu.Item label="Timer" onPress={() => alert('You pressed Timer')} />
    </Menu>
    <Menu icon="computer" iconColor="blue" maxWidth={100}>
      <Menu.Item
        icon="home"
        label="Option1, this is 600px wide"
        onPress={() => console.log('you pressed Home')}
      />
      <Menu.Item
        icon="home"
        label="Option2, this is 600px wide"
        onPress={() => console.log('you pressed Timer')}
      />
    </Menu>
    <Menu icon="menu" align="left">
      <Menu.Item
        label="Action 1"
        onPress={() => alert('You pressed Action 1')}
      />
      <Menu.Item
        label="Action 2"
        onPress={() => alert('You pressed Action 2')}
      />
      <Menu.Item
        label="Action 3"
        onPress={() => alert('You pressed Action 3')}
      />
      <Menu.Item
        label="Action 4"
        onPress={() => alert('You pressed Action 4')}
      />
      <Menu.Item
        label="Action 5"
        onPress={() => alert('You pressed Action 5')}
      />
      <Menu.Item
        label="Action 6"
        onPress={() => alert('You pressed Action 6')}
      />
      <Menu.Item
        label="Action 7"
        onPress={() => alert('You pressed Action 7')}
      />
      <Menu.Item
        label="Action 8"
        onPress={() => alert('You pressed Action 8')}
      />
      <Menu.Item
        label="Action 9"
        onPress={() => alert('You pressed Action 9')}
      />
    </Menu>

    <Menu>
      <Menu.Item
        icon="home"
        label="Option1"
        onPress={() => console.log('you pressed Home')}
      />
      <Menu.Item
        icon="home"
        label="Option2"
        onPress={() => console.log('you pressed Timer')}
      />
    </Menu>
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
