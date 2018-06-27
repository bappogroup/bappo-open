import React from 'react';
import { Form, Select, TextInput, View } from 'bappo-components';

const deliveryMethodOptions = [
  { label: 'Deliver', value: 'deliver' },
  { label: 'Pick up', value: 'pick_up' },
];
const pickupPointOptions = [
  { label: 'Town Hall', value: 'town_hall' },
  { label: 'Redfern', value: 'redfern' },
];

const ShowHideFieldBasedOnFormState = () => {
  return (
    <View>
      <Form onSubmit={values => alert(JSON.stringify(values, null, 2))}>
        {({ getFieldValue }) => {
          const deliveryMethod = getFieldValue('deliveryMethod');
          return (
            <React.Fragment>
              <Form.Field
                name="deliveryMethod"
                component={Select}
                label="Delivery Method"
                props={{ options: deliveryMethodOptions }}
              />
              {deliveryMethod === 'deliver' && (
                <Form.Field
                  name="address"
                  component={TextInput}
                  label="Address"
                />
              )}
              {deliveryMethod === 'pick_up' && (
                <Form.Field
                  name="pickupPoint"
                  component={Select}
                  label="Pick-up point"
                  props={{ options: pickupPointOptions }}
                />
              )}
              <Form.SubmitButton />
            </React.Fragment>
          );
        }}
      </Form>
    </View>
  );
};

export default ShowHideFieldBasedOnFormState;
