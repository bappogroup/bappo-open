import React from 'react';
import { View, Form, SubmitButton, TextField } from 'bappo-components';

class Minimal extends React.Component {
  render() {
    return (
      <View>
        <Form
          onSubmit={({ email = '' }) => alert(`Email is: ${email}`)}
          testID="minimal-form"
        >
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
          <SubmitButton text="Submit" />
        </Form>
      </View>
    );
  }
}

export default Minimal;
