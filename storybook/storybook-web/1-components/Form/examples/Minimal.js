import React from 'react';
import { Form, TextInput, View } from 'bappo-components';

const Minimal = () => {
  return (
    <View>
      <Form onSubmit={values => alert(JSON.stringify(values, null, 2))}>
        <Form.Field name="firstName" component={TextInput} label="First Name" />
        <Form.Field name="lastName" component={TextInput} label="Last Name" />
        <Form.SubmitButton />
      </Form>
    </View>
  );
};

export default Minimal;
