import {
  Alert,
  Button,
  ModalForm,
  SwitchField,
  TextField,
  View,
} from 'bappo-components';
import React from 'react';
class ModalFormHoldSubmitExample extends React.Component {
  state = {
    modalVisible: false,
    holdSubmitValidation: true,
  };

  render() {
    const thisHoldSubmit = this.state.holdSubmitValidation;
    console.log('holdSubmitValidation: ', thisHoldSubmit);
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
          title="Modal Form Hold Submit Example"
          visible={this.state.modalVisible}
          testID="modalForm-holdSubmit"
          onCancel={(values) => {
            Alert.alert('canceled!!!');
          }}
          initialValues={{ holdSubmit: thisHoldSubmit }}
          holdSubmit={this.state.holdSubmitValidation}
        >
          <TextField name="firstName" label="First Name" autoFocus />
          <TextField name="lastName" label="Last Name" />
          <SwitchField
            name="holdSubmit"
            label="Hold Submit"
            onValueChange={() =>
              this.setState({ holdSubmitValidation: !thisHoldSubmit })
            }
          />
        </ModalForm>
      </View>
    );
  }
}

export default ModalFormHoldSubmitExample;
