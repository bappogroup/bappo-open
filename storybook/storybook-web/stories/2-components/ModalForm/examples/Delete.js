import React from 'react';
import {
  Alert,
  Button,
  Form,
  ModalForm,
  TextField,
  View,
} from 'bappo-components';

class ModalFormDeleteExample extends React.Component {
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
          title="Modal Form Delete Example"
          visible={this.state.modalVisible}
          onDelete={() => Alert.alert({ title: 'deleting!' })}
        >
          <Form.Field
            name="firstName"
            component={TextField}
            label="First Name"
          />
          <Form.Field name="lastName" component={TextField} label="Last Name" />
        </ModalForm>
      </View>
    );
  }
}

export default ModalFormDeleteExample;
