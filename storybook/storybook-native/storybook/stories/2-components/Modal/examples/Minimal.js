import React from 'react';
import { Button, Modal, View, Text } from 'bappo-components';

class ModalMinimalExample extends React.Component {
  state = {
    visible: false,
    fullscreen: true,
  };

  render() {
    return (
      <View>
        <Button
          type="primary"
          onPress={() => this.setState({ visible: true, fullscreen: false })}
          text="Open Modal"
        />
        <View style={{ height: 10 }} />
        <Button
          type="primary"
          onPress={() => this.setState({ visible: true, fullscreen: true })}
          text="Open Full Screen Modal"
        />

        <Modal
          onRequestClose={() => this.setState({ visible: false })}
          visible={this.state.visible}
          placement={this.state.fullscreen ? { type: 'fullscreen' } : null}
        >
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <Text> Hello World </Text>
            <Button
              type="primary"
              onPress={() => this.setState({ visible: false })}
              text="Close Modal"
            />
          </View>
        </Modal>
      </View>
    );
  }
}

export default ModalMinimalExample;
