import { Menu, Text, View } from 'bappo-components';
import React from 'react';

const MenuExample = () => (
  <View style={outerStyle}>
    <Menu minWidth={200}>
      <Menu.CloseButton />
      <Menu.MenuItem
        icon="home"
        label="Home"
        onPress={() => console.log('you pressed Home')}
      />
      <hr
        style={{
          backgroundColor: 'gray',
          width: '200px',
          height: '5px',
          margin: 0,
        }}
      />
      <Menu.MenuItem label="Timer" onPress={() => alert('You pressed Timer')} />
    </Menu>
    <Menu
      trigger={
        <View>
          <Text>Custom children</Text>
        </View>
      }
    >
      <Menu.MenuItem
        label="Action 1 - No Icon"
        onPress={() => alert('You pressed Action 1 - No Icon')}
      />
      <Menu.MenuItem
        label="Action 2 - No Icon"
        onPress={() => alert('You pressed Action 2 - No Icon')}
      />
    </Menu>
    <Menu icon="cloud" align="right">
      <Menu.MenuItem
        icon="home"
        label="Home"
        onPress={() => console.log('you pressed Home')}
      />
      <Menu.MenuItem label="Timer" onPress={() => alert('You pressed Timer')} />
    </Menu>
    <Menu icon="menu" align="left">
      <Menu.MenuItem
        icon="home"
        label="Home"
        onPress={() => console.log('you pressed Home')}
      />
      <Menu.MenuItem label="Timer" onPress={() => alert('You pressed Timer')} />
    </Menu>
    <Menu icon="computer" iconColor="blue" minWidth={600}>
      <Menu.MenuItem
        icon="home"
        label="Option1, this is 600px wide"
        onPress={() => console.log('you pressed Home')}
      />
      <Menu.MenuItem
        icon="home"
        label="Option2, this is 600px wide"
        onPress={() => console.log('you pressed Timer')}
      />
    </Menu>
    <Menu icon="menu" align="left">
      <Menu.MenuItem
        label="Action 1"
        onPress={() => alert('You pressed Action 1')}
      />
      <Menu.MenuItem
        label="Action 2"
        onPress={() => alert('You pressed Action 2')}
      />
      <Menu.MenuItem
        label="Action 3"
        onPress={() => alert('You pressed Action 3')}
      />
      <Menu.MenuItem
        label="Action 4"
        onPress={() => alert('You pressed Action 4')}
      />
      <Menu.MenuItem
        label="Action 5"
        onPress={() => alert('You pressed Action 5')}
      />
      <Menu.MenuItem
        label="Action 6"
        onPress={() => alert('You pressed Action 6')}
      />
      <Menu.MenuItem
        label="Action 7"
        onPress={() => alert('You pressed Action 7')}
      />
      <Menu.MenuItem
        label="Action 8"
        onPress={() => alert('You pressed Action 8')}
      />
      <Menu.MenuItem
        label="Action 9"
        onPress={() => alert('You pressed Action 9')}
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
