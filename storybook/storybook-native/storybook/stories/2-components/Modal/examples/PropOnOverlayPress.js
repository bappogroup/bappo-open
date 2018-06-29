import React from 'react';
import { Button, Modal, Text, View } from 'bappo-components';

class ModalPropOnOverlayPressExample extends React.Component {
  state = {
    visible: false,
  };

  close = () => this.setState({ visible: false });

  render() {
    return (
      <View>
        <Button
          type="primary"
          onPress={() => this.setState({ visible: true })}
          text="Open Modal"
        />
        <Modal
          onOverlayPress={this.close}
          onRequestClose={this.close}
          visible={this.state.visible}
        >
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <Text>Press on outside to close modal</Text>
            <Button type="primary" onPress={this.close} text="Close Modal" />
          </View>
        </Modal>
      </View>
    );
  }
}

export default ModalPropOnOverlayPressExample;
