import React from 'react';
import { View, Form, TextField, Text } from 'bappo-components';

class Minimal extends React.Component {
  render() {
    return (
      <View>
        <Form onSubmit={values => console.log(values)} testID="minimal-form">
          <Form.Field
            name="email"
            label="Email"
            component={TextField}
            props={{
              autoFocus: true,
              placeholder: 'Your email address',
              type: 'email',
            }}
          />
          <Form.SubmitButton testID="submit-button">
            <Text>Submit</Text>
          </Form.SubmitButton>
        </Form>
      </View>
    );
  }
}

export default Minimal;
