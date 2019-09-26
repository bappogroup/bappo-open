import React from 'react';
import { Button, Form, ModalForm, TextField, View } from 'bappo-components';

class ModalFormPropSubmitButtonTextExample extends React.Component {
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
          initialValues={{ name: 'Alice' }}
          onRequestClose={() => this.setState({ modalVisible: false })}
          onSubmit={console.log}
          submitButtonText={({ getFieldValue }) =>
            `Invite ${getFieldValue('name') || ''}`
          }
          title="Modal Form Prop submitButtonText Example"
          visible={this.state.modalVisible}
        >
          <Form.Field name="name" component={TextField} label="Name" />
        </ModalForm>
      </View>
    );
  }
}

export default ModalFormPropSubmitButtonTextExample;
