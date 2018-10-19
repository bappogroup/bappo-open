import React from 'react';
import { Button, Modal, View } from 'bappo-components';

class ModalMinimalExample extends React.Component {
  state = {
    visible: false,
  };

  render() {
    return (
      <View>
        <Button
          type="primary"
          onPress={() => this.setState({ visible: true })}
          text="Open Modal"
        />
        <Modal
          onRequestClose={() => this.setState({ visible: false })}
          visible={this.state.visible}
        >
          <View style={{ height: 20, backgroundColor: 'green' }} />
          <Button
            type="primary"
            onPress={() => this.setState({ visible: false })}
            text="Close Modal"
          />
        </Modal>
      </View>
    );
  }
}

export default ModalMinimalExample;
