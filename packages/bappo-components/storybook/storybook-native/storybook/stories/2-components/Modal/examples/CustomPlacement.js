import {
  Button,
  Form,
  Modal,
  SubmitButton,
  Text,
  TextField,
  View,
} from 'bappo-components';
import React from 'react';

class CustomPlacementExample extends React.Component {
  state = {
    visible: false,
    fullscreen: true,
  };

  render() {
    return (
      <View>
        <Form
          initialValues={{
            width: '600',
            height: '300',
            left: '50',
          }}
          onSubmit={({ width, height, top, left }) =>
            this.setState({
              width,
              height,
              top,
              left,
              visible: true,
              custom: true,
            })
          }
          testID="custom-placement-values-form"
        >
          {() => {
            return (
              <React.Fragment>
                <Form.Field
                  name="width"
                  label="Width"
                  component={TextField}
                  props={{
                    autoFocus: true,
                    placeholder: 'Optional modal width',
                  }}
                />
                <Form.Field
                  name="height"
                  label="Height"
                  component={TextField}
                  props={{
                    placeholder: 'Optional modal height',
                  }}
                />
                <Form.Field
                  name="top"
                  label="Top"
                  component={TextField}
                  props={{
                    placeholder: 'Optional modal top anchor',
                  }}
                />
                <Form.Field
                  name="left"
                  label="Left"
                  component={TextField}
                  props={{
                    placeholder: 'Optional modal left anchor',
                  }}
                />
                <SubmitButton text="Open Custom Placed Modal" />
              </React.Fragment>
            );
          }}
        </Form>

        <Modal
          onRequestClose={() => this.setState({ visible: false })}
          visible={this.state.visible && this.state.custom}
          placement={
            this.state.custom
              ? {
                  type: 'custom',
                  width: this.state.width,
                  height: this.state.height,
                  top: this.state.top,
                  left: this.state.left,
                }
              : null
          }
        >
          <View
            style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}
          >
            <Text> Hello World </Text>
            <Button
              type="primary"
              onPress={() => this.setState({ visible: false })}
              text="Close Modal"
            />
          </View>
        </Modal>
      </View>
    );
  }
}

export default CustomPlacementExample;
