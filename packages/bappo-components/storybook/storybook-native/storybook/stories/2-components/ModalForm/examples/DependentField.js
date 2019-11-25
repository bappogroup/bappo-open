import React from 'react';
import {
  Alert,
  Button,
  Form,
  ModalForm,
  SelectField,
  View,
} from 'bappo-components';
import stateOptionsByCountry from '../../../../data/states';

const countryOptions = [
  { label: 'Australia', value: 'AU' },
  { label: 'USA', value: 'US' },
];

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
          onSubmit={values =>
            Alert.alert({ message: JSON.stringify(values, null, 2) })
          }
          title="Modal Form Dependent Field Example"
          visible={this.state.modalVisible}
          placement={{ type: 'fullscreen' }}
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

export default ModalFormDependentFieldExample;
