import { Button, Dropdown, Modal, Text } from 'bappo-components';
import React from 'react';

export default function InsideModalExample() {
  const [outerModalVisible, setOuterModalVisible] = React.useState(false);
  const [innerModalVisible, setInnerModalVisible] = React.useState(true);
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
          <Dropdown
            actions={[
              {
                icon: 'home',
                label: 'Home',
                onPress: () => console.log('you pressed Home'),
              },
              {
                label: 'Timer',
                onPress: () => alert('You pressed Timer'),
              },
            ]}
          />
        </Modal>
      </Modal>
    </>
  );
}
