import {
  Alert,
  Button,
  ModalForm,
  SwitchField,
  TextField,
  View,
} from 'bappo-components';
import React from 'react';
class ModalFormCanSubmitExample extends React.Component {
  state = {
    modalVisible: false,
    submitValidation: true,
  };

  render() {
    const thisCanSubmit = this.state.submitValidation;
    console.log('canSubmit state: ', thisCanSubmit);
    return (
      <View>
        <Button
          onPress={() => this.setState({ modalVisible: true })}
          text="Open form"
        />
        <ModalForm
          onRequestClose={() => this.setState({ modalVisible: false })}
          onSubmit={(values) =>
            Alert.alert({ message: JSON.stringify(values, null, 2) })
          }
          title="Modal Form Can Submit Example"
          visible={this.state.modalVisible}
          testID="modalForm-canSubmit"
          onCancel={(values) => {
            Alert.alert('canceled!!!');
          }}
          holdSubmit={this.state.submitValidation}
        >
          <TextField name="firstName" label="First Name" autoFocus />
          <TextField name="lastName" label="Last Name" />
          <SwitchField
            name="canSubmit"
            label="Can Submit"
            onValueChange={() =>
              this.setState({ submitValidation: !thisCanSubmit })
            }
            value={thisCanSubmit}
          />
        </ModalForm>
      </View>
    );
  }
}

export default ModalFormCanSubmitExample;
