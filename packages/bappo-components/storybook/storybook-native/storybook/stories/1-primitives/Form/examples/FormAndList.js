import { Form, ScrollView, TextField, View } from 'bappo-components';
import React from 'react';
// import Form from '../../../../../../../src/primitives/Form/Form.native/index';

export default function FormAndList() {
  return (
    <View style={{ height: 400, overflow: 'hidden' }}>
      <ScrollView style={{ flex: 1, backgroundColor: 'dodgerblue' }}>
        <Form
          onSubmit={values => console.log(values)}
          style={{
            flex: 1,
          }}
        >
          <Form.Field
            name="email"
            label="Emailqqq"
            component={TextField}
            props={{
              autoFocus: true,
              placeholder: 'Your email address',
              type: 'email',
            }}
          />
          <Form.Field
            name="email2"
            label="Email2"
            component={TextField}
            props={{
              autoFocus: true,
              placeholder: 'Your email address',
              type: 'email',
            }}
          />
          <Form.Field
            name="email3"
            label="Email3"
            component={TextField}
            props={{
              autoFocus: true,
              placeholder: 'Your email address',
              type: 'email',
            }}
          />
          <Form.Field
            name="email4"
            label="Email4"
            component={TextField}
            props={{
              autoFocus: true,
              placeholder: 'Your email address',
              type: 'email',
            }}
          />
        </Form>
      </ScrollView>

      <View
        style={{
          flexGrow: 1,
          flexShrink: 1,
          backgroundColor: 'pink',
        }}
      />
    </View>
  );
}
