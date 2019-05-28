import React from 'react';
import {
  styled,
  View,
  Form,
  Text,
  TextField,
  SelectField,
  SwitchField,
  DateField,
  TimeField,
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
                <Form.Field name="date" label="Date" component={DateField} />
                <Form.Field name="time" label="Time" component={TimeField} />
                <Form.Field
                  name="textDummy"
                  label="Text Dummy"
                  component={TextField}
                />
                <Text>You have chosen the user type: {userType}</Text>
                <StyledButton>
                  <Text style={{ color: 'white' }}>Submit</Text>
                </StyledButton>
              </React.Fragment>
            );
          }}
        </Form>
      </View>
    );
  }
}

export default GetFieldValues;

const StyledButton = styled(Form.SubmitButton)`
  background-color: orange;
  border-radius: 4px;
  width: 100px;
`;
