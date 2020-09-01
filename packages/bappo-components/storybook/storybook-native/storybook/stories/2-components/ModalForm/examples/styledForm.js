import { Alert, Button, ModalForm, TextField, View } from 'bappo-components';
import React from 'react';
class ModalFormStyledExample extends React.Component {
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
          onSubmit={(values) =>
            Alert.alert({ message: JSON.stringify(values, null, 2) })
          }
          title="Modal Form Styled Example"
          visible={this.state.modalVisible}
          testID="modalForm-Styled"
          footerContainerStyle={{
            footerStyle: { backgroundColor: 'red' },
            cancelBtnStyle: {
              backgroundColor: 'red',
              border: 'none',
            },
            cancelBtnTextStyle: {
              color: 'orange',
            },
            submitBtnStyle: { color: 'red', backgroundColor: 'blue' },
          }}
          headerContainerStyle={{
            headerStyle: { backgroundColor: 'red' },
            titleStyle: { color: 'pink' },
            closeIconStyle: { color: 'green' },
          }}
        >
          <TextField name="firstName" label="First Name" autoFocus />
          <TextField name="lastName" label="Last Name" />
        </ModalForm>
      </View>
    );
  }
}

export default ModalFormStyledExample;
