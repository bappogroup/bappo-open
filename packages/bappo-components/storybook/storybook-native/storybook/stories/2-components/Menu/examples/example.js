import { Menu, Text, View, styled } from 'bappo-components';
import React from 'react';

const MenuExample = () => (
  <View style={outerStyle}>
    <Menu minWidth={200}>
      <Menu.Item icon="home" onPress={() => console.log('you pressed Home')}>
        Home
      </Menu.Item>
      <HorizontalLine />
      <Menu.Item onPress={() => alert('You pressed Timer')}>Timer</Menu.Item>
    </Menu>
    <Menu
      trigger={
        <View>
          <Text>Custom children</Text>
        </View>
      }
    >
      <Menu.Item onPress={() => alert('You pressed Action 1 - No Icon')}>
        Action 1 - No Icon
      </Menu.Item>
      <Menu.Item onPress={() => alert('You pressed Action 2 - No Icon')}>
        Action 2 - No Icon
      </Menu.Item>
    </Menu>
    <Menu icon="cloud" align="right">
      <Menu.Item icon="home" onPress={() => console.log('you pressed Home')}>
        Home
      </Menu.Item>
      <Menu.Item onPress={() => alert('You pressed Timer')}>Timer</Menu.Item>
    </Menu>
    <Menu icon="menu">
      <Menu.Item icon="home" onPress={() => console.log('you pressed Home')}>
        Home
      </Menu.Item>
      <Menu.Item onPress={() => alert('You pressed Timer')}>Timer</Menu.Item>
    </Menu>
    <Menu icon="computer" iconColor="blue" maxWidth={100}>
      <Menu.Item icon="home" onPress={() => console.log('you pressed Home')}>
        Option1, this is 600px wide
      </Menu.Item>
      <Menu.Item icon="home" onPress={() => console.log('you pressed Timer')}>
        Option2, this is 600px wide
      </Menu.Item>
    </Menu>
    <Menu icon="menu" align="left">
      <Menu.Item onPress={() => alert('You pressed Action 1')}>
        Action 1
      </Menu.Item>
      <Menu.Item onPress={() => alert('You pressed Action 2')}>
        Action 2
      </Menu.Item>
      <Menu.Item onPress={() => alert('You pressed Action 3')}>
        Action 3
      </Menu.Item>
      <Menu.Item onPress={() => alert('You pressed Action 4')}>
        Action 4
      </Menu.Item>
      <Menu.Item onPress={() => alert('You pressed Action 5')}>
        Action 5
      </Menu.Item>
      <Menu.Item onPress={() => alert('You pressed Action 6')}>
        Action 6
      </Menu.Item>
      <Menu.Item onPress={() => alert('You pressed Action 7')}>
        Action 7
      </Menu.Item>
      <Menu.Item onPress={() => alert('You pressed Action 8')}>
        Action 8
      </Menu.Item>
      <Menu.Item onPress={() => alert('You pressed Action 9')}>
        Action 9
      </Menu.Item>
    </Menu>

    <Menu>
      <Menu.Item icon="home" onPress={() => console.log('you pressed Home')}>
        Option1
      </Menu.Item>
      <Menu.Item icon="home" onPress={() => console.log('you pressed Timer')}>
        Option2
      </Menu.Item>
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

const HorizontalLine = styled(View)`
  background-color: gray;
  width: 100%;
  height: 5px;
  margin: 0;
`;
