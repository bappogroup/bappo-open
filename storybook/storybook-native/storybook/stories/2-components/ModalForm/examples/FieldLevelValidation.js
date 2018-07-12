import React from 'react';
import {
  Alert,
  Button,
  Form,
  ModalForm,
  SwitchField,
  TextField,
  View,
} from 'bappo-components';
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
          <Form.Field
            name="email"
            component={TextField}
            label="Email"
            validate={value =>
              value && isEmail(value) ? undefined : 'Invalid email'
            }
            props={{ type: 'email' }}
          />
          <Form.Field
            name="password"
            component={TextField}
            label="Password"
            validate={value => (value ? undefined : 'Password is required')}
            props={{ type: 'password' }}
          />
          <Form.Field
            name="rememberMe"
            component={SwitchField}
            label="Remember Me"
          />
        </ModalForm>
      </View>
    );
  }
}

export default ModalFormFieldLevelValidationExample;
