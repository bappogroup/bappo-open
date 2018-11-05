import React from 'react';
import UIExplorer, {
  AppText,
  Code,
  Description,
  DocItem,
  Section,
  storiesOf,
} from '../../../ui-explorer';
import Minimal from './examples/Minimal';
import GetFieldValues from './examples/GetFieldValues';

const FormScreen = () => (
  <UIExplorer title="Form" url="1-primitives/Form">
    <Description>
      <AppText>Form.</AppText>
    </Description>

    <Section title="Props">
      <DocItem
        name="children?"
        typeInfo="?React.Node | ((formState: FormStateAndHelpersAndActions) => React.Node)"
        description="Body of the form. Can be a React node or a render function which will receive the form state as argument."
      />

      <DocItem
        name="initialValues?"
        typeInfo="mixed"
        description={
          <AppText>
            Initial values of the form. It should be in the format of{' '}
            <Code>
              {JSON.stringify({ field1: 'value1', field2: 'value2' })}
            </Code>
          </AppText>
        }
      />

      <DocItem
        name="onSubmit?"
        typeInfo="(values: mixed) => void"
        description="Function to be called when form is submitted."
      />
    </Section>

    <Section title="Form.Field Props">
      <DocItem
        name="component"
        typeInfo="Class<InputComponent>"
        description={
          <AppText>
            A React class component that renders input. It must accept props{' '}
            <Code>onBlur</Code>, <Code>onFocus</Code>,{' '}
            <Code>onValueChange</Code> and <Code>value</Code>. It must also have
            instance methods <Code>blur()</Code> and <Code>focus()</Code>.
          </AppText>
        }
      />

      <DocItem name="label" typeInfo="string" description="Field label." />

      <DocItem name="name" typeInfo="string" description="Field name." />

      <DocItem
        name="props?"
        typeInfo="?{}"
        description="Additional props to pass to the input component."
      />

      <DocItem
        name="validate?"
        typeInfo="FieldValidator | FieldValidator[]"
        description="Function or an array of functions to validate the field."
      />
    </Section>

    <Section title="Form.SubmitButton Props">
      <DocItem
        name="children?"
        typeInfo="?React.Node | ((formState: FormStateAndHelpersAndActions) => React.Node)"
        description="Button children."
      />
    </Section>

    <Section title="Examples">
      <DocItem
        description="Minimal"
        example={{
          code: `

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
          `,
          render: () => <Minimal />,
        }}
      />

      <DocItem
        description="Get Field Values & All Field Types"
        example={{
          code: `

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
          `,
          render: () => <GetFieldValues />,
        }}
      />
    </Section>
  </UIExplorer>
);

storiesOf('Primitives', module).add('Form', FormScreen);
