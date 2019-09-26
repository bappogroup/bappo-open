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
      {({ getFieldValue }) => {
        const requireAge = getFieldValue('requireAge');
        return (
          <React.Fragment>
            <Form.Field
              name="name"
              label="Name"
              component={TextField}
              validate={value => (value ? undefined : 'Required')}
            />
            <Form.Field
              name="requireAge"
              label="Require Age"
              component={SelectField}
              props={{
                options: [
                  { value: 'yes', label: 'Yes' },
                  { value: 'no', label: 'No' },
                ],
              }}
            />
            {requireAge === 'yes' && (
              <Form.Field
                name="age"
                label="Age"
                component={TextField}
                props={{
                  type: 'number',
                }}
              />
            )}
          </React.Fragment>
        );
      }}
    </Form>
  );

  renderSecondScreen = () => {
    const { formValues } = this.state;
    return (
      <View>
        <Text>Summary</Text>
        <Text>Selected values are:</Text>
        <Text>Name: {formValues.name}</Text>
        <Text>Age: {formValues.age}</Text>
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
              console.log(
                'Submitting the wizard, values are: ',
                this.state.formValues,
              )
            }
          />
        )}
      </View>
    );
  }
}

export default ModalWizardExample;
