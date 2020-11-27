import { Button, Menu, Modal, Text } from 'bappo-components';
import React from 'react';

export default function InsideModalExample() {
  const [outerModalVisible, setOuterModalVisible] = React.useState(false);
  const [innerModalVisible, setInnerModalVisible] = React.useState(false);
  return (
    <>
      <Button onPress={() => setOuterModalVisible(true)} text="Open Modal" />
      <Modal
        onRequestClose={() => setOuterModalVisible(false)}
        visible={outerModalVisible}
      >
        <Text>Outer</Text>
        <Button
          onPress={() => setInnerModalVisible(true)}
          text="Open Inner Modal"
        />
        <Modal
          onRequestClose={() => setInnerModalVisible(false)}
          visible={innerModalVisible}
        >
          <Text>Inner</Text>
          <Menu>
            <Menu.Item
              icon="home"
              label="Home"
              onPress={() => console.log('you pressed Home')}
            />
            <Menu.Item
              label="Timer"
              onPress={() => alert('You pressed Timer')}
            />
          </Menu>
        </Modal>
      </Modal>
    </>
  );
}
