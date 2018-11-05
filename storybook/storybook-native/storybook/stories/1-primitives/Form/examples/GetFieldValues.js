import React from 'react';
import {
  View,
  Form,
  Text,
  TextField,
  SelectField,
  SwitchField,
  DatePickerField,
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
                  name="switch"
                  label="Switch"
                  component={SwitchField}
                />
                <Form.Field
                  name="textMultiline"
                  label="Text Multiline"
                  component={TextField}
                  props={{
                    multiline: true,
                  }}
                />
                <Form.Field
                  name="date"
                  label="Date"
                  component={DatePickerField}
                />
                <Form.Field
                  name="textDummy"
                  label="Text Dummy"
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
