import React from 'react';
import { Form, SwitchField, TextField, View } from 'bappo-components';
import { isEmail } from 'validator';

const FieldLevelValidation = () => {
  return (
    <View>
      <Form
        initialValues={{ email: '', password: '' }}
        onSubmit={values => alert(JSON.stringify(values, null, 2))}
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
        <Form.SubmitButton />
      </Form>
    </View>
  );
};

export default FieldLevelValidation;
