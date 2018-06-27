import React from 'react';
import UIExplorer, {
  AppText,
  Code,
  Description,
  DocItem,
  Section,
  storiesOf,
} from '../../../ui-explorer';
import DependentField from './examples/DependentField';
import Minimal from './examples/Minimal';
import ShowHideFieldBasedOnFormState from './examples/ShowHideFieldBasedOnFormState';
import FieldLevelValidation from './examples/FieldLevelValidation';

const FormScreen = () => (
  <UIExplorer title="Form" url="2-components/Form">
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
        name="text?"
        typeInfo="string = 'Submit'"
        description="Button text."
      />
    </Section>

    <Section title="More examples">
      <DocItem
        description="Minimal"
        example={{
          code: `
<Form onSubmit={values => Alert.alert(JSON.stringify(values, null, 2))}>
  <Form.Field
    name="firstName"
    component={TextField}
    label="First Name"
  />
  <Form.Field
    name="lastName"
    component={TextField}
    label="Last Name"
  />
  <Form.SubmitButton />
</Form>
          `,
          render: () => <Minimal />,
        }}
      />
      <DocItem
        description="Field-level validation"
        example={{
          code: `
<Form onSubmit={values => Alert.alert(JSON.stringify(values, null, 2))}>
  <Form.Field
    name="email"
    component={TextField}
    label="Email"
    validate={value => (isEmail(value) ? undefined : 'Invalid email')}
    props={{ type: 'email' }}
  />
  <Form.Field
    name="password"
    component={TextField}
    label="Password"
    validate={value => (value ? undefined : 'Password is required')}
    props={{ type: 'password' }}
  />
  <Form.SubmitButton />
</Form>
          `,
          render: () => <FieldLevelValidation />,
        }}
      />
      <DocItem
        description="Dependent Field"
        example={{
          code: `
<Form onSubmit={values => Alert.alert(JSON.stringify(values, null, 2))}>
  {({ getFieldValue }) => {
    const country = getFieldValue('country');
    return (
      <React.Fragment>
        <Form.Field
          name="country"
          component={SelectField}
          label="Country"
          props={{
            options: countryOptions,
          }}
        />
        <Form.Field
          name="state"
          component={SelectField}
          label="State"
          props={{
            options: country ? stateOptionsByCountry[country] : [],
          }}
        />
        <Form.SubmitButton />
      </React.Fragment>
    );
  }}
</Form>
          `,
          render: () => <DependentField />,
        }}
      />
      <DocItem
        description="Show/Hide field based on form state"
        example={{
          code: `
<Form onSubmit={values => Alert.alert(JSON.stringify(values, null, 2))}>
  {({ getFieldValue }) => {
    const deliveryMethod = getFieldValue('deliveryMethod');
    return (
      <React.Fragment>
        <Form.Field
          name="deliveryMethod"
          component={SelectField}
          label="Delivery Method"
          props={{
            options: deliveryMethodOptions,
          }}
        />
        {deliveryMethod === 'deliver' && (
          <Form.Field
            name="address"
            component={TextField}
            label="Address"
          />
        )}
        {deliveryMethod === 'pick_up' && (
          <Form.Field
            name="pickupPoint"
            component={SelectField}
            label="Pick-up point"
            props={{
              options: pickupPointOptions,
            }}
          />
        )}
        <Form.SubmitButton />
      </React.Fragment>
    );
  }}
</Form>
          `,
          render: () => <ShowHideFieldBasedOnFormState />,
        }}
      />
    </Section>
  </UIExplorer>
);

storiesOf('Components', module).add('Form', FormScreen);
