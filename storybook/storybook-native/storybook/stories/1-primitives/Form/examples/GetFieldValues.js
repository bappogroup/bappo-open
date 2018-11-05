import React from 'react';
import {
  View,
  Form,
  TextField,
  Text,
  SelectField,
  SwitchField,
} from 'bappo-components';

class GetFieldValues extends React.Component {
  render() {
    return (
      <View>
        <Form
          initialValues={{
            email: 'stanley.luo@bappo.com',
          }}
          onSubmit={values => console.log(values)}
          testID="get-field-values-form"
        >
          {({ getFieldValue }) => {
            const userType = getFieldValue('userType');
            return (
              <React.Fragment>
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
                <Form.Field
                  name="userType"
                  label="User Type"
                  component={SelectField}
                  props={{
                    options: [
                      {
                        value: 'free',
                        label: 'Free',
                      },
                      {
                        value: 'premium',
                        label: 'Premium',
                      },
                    ],
                  }}
                />
                <Form.Field
                  name="dummy1"
                  label="Dummy 1"
                  component={SwitchField}
                />
                <Form.Field
                  name="dummy2"
                  label="Dummy 2"
                  component={SwitchField}
                />
                <Form.Field
                  name="dummy3"
                  label="Dummy 3"
                  component={TextField}
                />
                <Form.Field
                  name="dummy4"
                  label="Dummy 4"
                  component={TextField}
                />
                <Text>You have chosen the user type: {userType}</Text>
                <Form.SubmitButton>
                  <Text>Submit</Text>
                </Form.SubmitButton>
              </React.Fragment>
            );
          }}
        </Form>
      </View>
    );
  }
}

export default GetFieldValues;
