import React from 'react';
import { Alert, View, Form, SubmitButton, TextField } from 'bappo-components';

class Minimal extends React.Component {
  render() {
    const handleSubmit = async ({ email = '' }) => {
      await new Promise(resolve => setTimeout(resolve, 1000));
      await Alert.alert(`Email is: ${email}`);
    };

    return (
      <View>
        <Form onSubmit={handleSubmit} testID="minimal-form">
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
