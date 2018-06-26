import React from 'react';
import { Form, TextInput, View } from 'bappo-components';
import { Alert } from 'react-native';
import { isEmail } from 'validator';

const FieldLevelValidation = () => {
  return (
    <View>
      <Form
        initialValues={{ email: '', password: '' }}
        onSubmit={values => Alert.alert(JSON.stringify(values, null, 2))}
      >
        <Form.Field
          name="email"
          component={TextInput}
          label="Email"
          validate={value =>
            value && isEmail(value) ? undefined : 'Invalid email'
          }
          props={{ type: 'email' }}
        />
        <Form.Field
          name="password"
          component={TextInput}
          label="Password"
          validate={value => (value ? undefined : 'Password is required')}
          props={{ type: 'password' }}
        />
        <Form.SubmitButton />
      </Form>
    </View>
  );
};

export default FieldLevelValidation;
