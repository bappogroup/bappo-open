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

const ModalFormScreen = () => (
  <UIExplorer title="ModalForm" url="2-components/ModalForm">
    <Description>
      <AppText>Form in a modal.</AppText>
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

    <Section title="More examples">
      <DocItem
        description="Minimal"
        example={{
          code: `
import {
  Alert,
  Button,
  Form,
  ModalForm,
  TextField,
  View,
} from 'bappo-components';

class ModalFormMinimalExample extends React.Component {
  state = {
    modalVisible: false,
  };

  render() {
    return (
      <View>
        <Button
          onPress={() => this.setState({ modalVisible: true })}
          text="Open form"
        />
        <ModalForm
          onRequestClose={() => this.setState({ modalVisible: false })}
          onSubmit={values => Alert.alert({ message: JSON.stringify(values, null, 2) })}
          title="Modal Form Minimal Example"
          visible={this.state.modalVisible}
        >
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
        </ModalForm>
      </View>
    );
  }
}
          `,
          render: () => <Minimal />,
        }}
      />
      <DocItem
        description="Field-level validation"
        example={{
          code: `
import {
  Alert,
  Button,
  Form,
  ModalForm,
  SwitchField,
  TextField,
  View,
} from 'bappo-components';
import { isEmail } from 'validator';

class ModalFormFieldLevelValidationExample extends React.Component {
  state = {
    modalVisible: false,
  };

  render() {
    return (
      <View>
        <Button
          onPress={() => this.setState({ modalVisible: true })}
          text="Open form"
        />
        <ModalForm
          onRequestClose={() => this.setState({ modalVisible: false })}
          onSubmit={values => Alert.alert({ message: JSON.stringify(values, null, 2) })}
          title="Modal Form Field Level Validation Example"
          visible={this.state.modalVisible}
        >
          <Form.Field
            name="email"
            component={TextField}
            label="Email"
            validate={value =>
              value && isEmail(value) ? undefined : 'Invalid email'
            }
            props={{ type: 'email' }}
          />
          <Form.Field
            name="password"
            component={TextField}
            label="Password"
            validate={value => (value ? undefined : 'Password is required')}
            props={{ type: 'password' }}
          />
          <Form.Field
            name="rememberMe"
            component={SwitchField}
            label="Remember Me"
          />
        </ModalForm>
      </View>
    );
  }
}
          `,
          render: () => <FieldLevelValidation />,
        }}
      />
      <DocItem
        description="Dependent Field"
        example={{
          code: `
import {
  Alert,
  Button,
  Form,
  ModalForm,
  SelectField,
  View,
} from 'bappo-components';

class ModalFormDependentFieldExample extends React.Component {
  state = {
    modalVisible: false,
  };

  render() {
    return (
      <View>
        <Button
          onPress={() => this.setState({ modalVisible: true })}
          text="Open form"
        />
        <ModalForm
          onRequestClose={() => this.setState({ modalVisible: false })}
          onSubmit={values => Alert.alert({ message: JSON.stringify(values, null, 2) })}
          title="Modal Form Dependent Field Example"
          visible={this.state.modalVisible}
        >
          {({ getFieldValue }) => {
            const country = getFieldValue('country');
            return (
              <React.Fragment>
                <Form.Field
                  name="country"
                  component={SelectField}
                  label="Country"
                  props={{ options: countryOptions }}
                />
                <Form.Field
                  name="state"
                  component={SelectField}
                  label="State"
                  props={{
                    options: country ? stateOptionsByCountry[country] : [],
                  }}
                />
              </React.Fragment>
            );
          }}
        </ModalForm>
      </View>
    );
  }
}
          `,
          render: () => <DependentField />,
        }}
      />
      <DocItem
        description="Show/Hide field based on form state"
        example={{
          code: `
import {
  Alert,
  Button,
  Form,
  ModalForm,
  SelectField,
  TextField,
  View,
} from 'bappo-components';

class ModalFormShowHideFieldBasedOnFormStateExample extends React.Component {
  state = {
    modalVisible: false,
  };

  render() {
    return (
      <View>
        <Button
          onPress={() => this.setState({ modalVisible: true })}
          text="Open form"
        />
        <ModalForm
          onRequestClose={() => this.setState({ modalVisible: false })}
          onSubmit={values => Alert.alert({ message: JSON.stringify(values, null, 2) })}
          title="Modal Form Show/Hide Field Based on Form State Example"
          visible={this.state.modalVisible}
        >
          {({ getFieldValue }) => {
            const deliveryMethod = getFieldValue('deliveryMethod');
            return (
              <React.Fragment>
                <Form.Field
                  name="deliveryMethod"
                  component={SelectField}
                  label="Delivery Method"
                  props={{ options: deliveryMethodOptions }}
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
                    props={{ options: pickupPointOptions }}
                  />
                )}
              </React.Fragment>
            );
          }}
        </ModalForm>
      </View>
    );
  }
}
          `,
          render: () => <ShowHideFieldBasedOnFormState />,
        }}
      />
    </Section>
  </UIExplorer>
);

storiesOf('Components', module).add('ModalForm', ModalFormScreen);
