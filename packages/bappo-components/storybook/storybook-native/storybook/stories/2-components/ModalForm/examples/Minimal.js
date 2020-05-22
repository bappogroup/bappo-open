import { Alert, Button, ModalForm, TextField, View } from 'bappo-components';
import React from 'react';

class ModalFormMinimalExample extends React.Component {
  state = {
    modalVisible: false,
  };

  render() {
    return (
      <View>
        <Button
          onPress={() => this.setState({ modalVisible: true })}
          text="Open form"
        />
        <ModalForm
          onRequestClose={() => this.setState({ modalVisible: false })}
          onSubmit={values =>
            Alert.alert({ message: JSON.stringify(values, null, 2) })
          }
          title="Modal Form Minimal Example"
          visible={this.state.modalVisible}
          testID="modalForm-minimal"
        >
          <TextField name="firstName" label="First Name" />
          <TextField name="lastName" label="Last Name" />
        </ModalForm>
      </View>
    );
  }
}

export default ModalFormMinimalExample;
