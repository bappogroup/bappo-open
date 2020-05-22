import {
  Alert,
  Button,
  Form,
  ModalForm,
  SwitchField,
  TextField,
  View,
} from 'bappo-components';
import React from 'react';
import { isEmail } from 'validator';

class ModalFormFieldLevelValidationExample extends React.Component {
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
          title="Modal Form Field Level Validation Example"
          visible={this.state.modalVisible}
        >
          <TextField
            name="email"
            label="Email"
            validate={value =>
              value && isEmail(value) ? undefined : 'Invalid email'
            }
            type="email"
          />
          <Form.Field
            name="password"
            component={TextField}
            label="Password"
            validate={value => (value ? undefined : 'Password is required')}
            props={{ type: 'password' }}
          />
          <Form.Field
            name="dummy1"
            component={TextField}
            label="No validation required field 1"
          />
          <Form.Field
            name="dummy2"
            component={TextField}
            label="No validation required field 2"
          />
          <Form.Field
            name="rememberMe"
            component={SwitchField}
            label="Remember Me"
          />
          <Form.Field
            name="switch2"
            component={SwitchField}
            label="Readonly Switch"
            props={{ disabled: true }}
          />
          <Form.Field
            name="dummy3"
            component={TextField}
            label="No validation required field 3"
          />
        </ModalForm>
      </View>
    );
  }
}

export default ModalFormFieldLevelValidationExample;
