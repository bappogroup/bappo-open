import React from 'react';
import { Form, Select, View } from 'bappo-components';
import stateOptionsByCountry from '../../../../data/states';

const countryOptions = [
  { label: 'Australia', value: 'AU' },
  { label: 'USA', value: 'US' },
];

const DependentField = () => {
  return (
    <View>
      <Form onSubmit={values => alert(JSON.stringify(values, null, 2))}>
        {({ getFieldValue }) => {
          const country = getFieldValue('country');
          return (
            <React.Fragment>
              <Form.Field
                name="country"
                component={Select}
                label="Country"
                props={{ options: countryOptions }}
              />
              <Form.Field
                name="state"
                component={Select}
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
    </View>
  );
};

export default DependentField;
