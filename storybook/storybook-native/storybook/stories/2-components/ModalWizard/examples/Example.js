import React from 'react';
import {
  Button,
  ModalWizard,
  Text,
  View,
  Form,
  TextField,
  SelectField,
} from 'bappo-components';

class ModalWizardExample extends React.Component {
  state = {
    showModal: false,
    formValues: {},
  };

  renderFirstScreen = () => (
    <Form onSubmit={formValues => this.setState({ formValues })}>
      <Form.Field
        name="name"
        label="Name"
        component={TextField}
        validate={value => (value ? undefined : 'Required')}
      />
      <Form.Field
        name="gender"
        label="Gender"
        component={SelectField}
        props={{
          options: [
            { label: 'Male', value: 'male' },
            { label: 'Female', value: 'female' },
          ],
        }}
      />
    </Form>
  );

  renderSecondScreen = () => {
    const { formValues } = this.state;
    return (
      <View>
        <Text>Summary</Text>
        <Text>Selected values are:</Text>
        <Text>Name: {formValues.name}</Text>
        <Text>Gender: {formValues.gender}</Text>
      </View>
    );
  };

  render() {
    return (
      <View>
        <Button
          onPress={() => this.setState({ showModal: true })}
          text="Open Wizard"
        />
        {this.state.showModal && (
          <ModalWizard
            visible
            onRequestClose={() => this.setState({ showModal: false })}
            screens={[
              {
                title: 'First Step',
                render: this.renderFirstScreen,
                isForm: true,
              },
              {
                title: 'Second Step',
                render: this.renderSecondScreen,
              },
            ]}
            onFinish={() =>
              console.log('Submit the wizard', this.state.formValues)
            }
          />
        )}
      </View>
    );
  }
}

export default ModalWizardExample;
