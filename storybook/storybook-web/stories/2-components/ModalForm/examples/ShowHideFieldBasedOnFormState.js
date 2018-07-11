import React from 'react';
import {
  Alert,
  Button,
  Form,
  ModalForm,
  SelectField,
  TextField,
  View,
} from 'bappo-components';

const deliveryMethodOptions = [
  { label: 'Deliver', value: 'deliver' },
  { label: 'Pick up', value: 'pick_up' },
];
const pickupPointOptions = [
  { label: 'Town Hall', value: 'town_hall' },
  { label: 'Redfern', value: 'redfern' },
];

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
          onSubmit={values =>
            Alert.alert({ message: JSON.stringify(values, null, 2) })
          }
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

export default ModalFormShowHideFieldBasedOnFormStateExample;
