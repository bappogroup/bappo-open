import { Button, Modal, Text, View } from 'bappo-components';
import React from 'react';

const renderFooter = () => {
  return (
    <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-end' }}>
      <Button text="Cancel" type="primary" />
    </View>
  );
};

class ModalWithHeaderFooter extends React.Component {
  state = {
    visible: false,
    fullscreen: true,
  };

  render() {
    return (
      <View>
        <Button
          type="primary"
          onPress={() =>
            this.setState({
              visible: true,
              fullscreen: false,
            })
          }
          text="Open Modal with Header and Footer"
        />

        <Modal
          onRequestClose={() => this.setState({ visible: false })}
          visible={this.state.visible}
          placement={this.state.fullscreen ? { type: 'fullscreen' } : null}
          renderFooter={renderFooter}
          title="Hello Bappo"
        >
          <Text> Hello World </Text>
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

export default ModalWithHeaderFooter;
