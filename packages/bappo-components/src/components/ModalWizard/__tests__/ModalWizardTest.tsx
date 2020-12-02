import React from 'react';

import Form from '../../../primitives/Form/Form.web';
import Text from '../../../primitives/Text';
import View from '../../../primitives/View';
import Button from '../../Button';
import SelectField from '../../input-fields/SelectField';
import TextField from '../../input-fields/TextField';
import ModalWizard from '..';

type ModalWizardTestState = {
  showModal: boolean;
  formValues: any;
};

export default function ModalWizardTest() {
  const [state, setState] = React.useState<ModalWizardTestState>({
    showModal: false,
    formValues: {},
  });

  const renderFirstScreen = () => (
    <Form onSubmit={(formValues) => setState({ ...state, formValues })}>
      {({ getFieldValue }) => {
        const requireAge = getFieldValue('requireAge');
        return (
          <React.Fragment>
            <Form.Field
              name="name"
              label="Name"
              component={TextField}
              validate={(value) => (value ? undefined : 'Required')}
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
              <Form.Field name="age" label="Age" component={TextField} />
            )}
          </React.Fragment>
        );
      }}
    </Form>
  );

  const renderSecondScreen = () => {
    const { formValues } = state;
    return (
      <View>
        <Text>Summary</Text>
        <Text>Selected values are:</Text>
        <Text>Name: {formValues.name}</Text>
        <Text>Age: {formValues.age}</Text>
      </View>
    );
  };

  return (
    <View>
      <Button
        onPress={() => setState({ ...state, showModal: true })}
        text="Open Wizard"
      />
      {state.showModal && (
        <ModalWizard
          testID="test"
          visible
          onRequestClose={() => setState({ ...state, showModal: false })}
          screens={[
            {
              title: 'First Step',
              render: renderFirstScreen,
              isForm: true,
            },
            {
              title: 'Second Step',
              render: renderSecondScreen,
            },
          ]}
          onFinish={() =>
            console.log('Submitting the wizard, values are: ', state.formValues)
          }
        />
      )}
    </View>
  );
}
