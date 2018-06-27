import React from 'react';
import { Form, TextField, View } from 'bappo-components';
import { Alert } from 'react-native';

const Minimal = () => {
  return (
    <View>
      <Form onSubmit={values => Alert.alert(JSON.stringify(values, null, 2))}>
        <Form.Field name="firstName" component={TextField} label="First Name" />
        <Form.Field name="lastName" component={TextField} label="Last Name" />
        <Form.SubmitButton />
      </Form>
    </View>
  );
};

export default Minimal;
