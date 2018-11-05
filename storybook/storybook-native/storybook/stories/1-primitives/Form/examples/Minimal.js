import React from 'react';
import { View, Form, TextField, Text } from 'bappo-components';

class Minimal extends React.Component {
  render() {
    return (
      <View>
        <Form onSubmit={values => console.log(values)}>
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
          <Form.SubmitButton>
            <Text>Submit</Text>
          </Form.SubmitButton>
        </Form>
      </View>
    );
  }
}

export default Minimal;
