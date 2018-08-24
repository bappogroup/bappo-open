// @flow

import * as React from 'react';
import { View } from 'react-native';
import type { FormProps } from '../types.js.flow';
import Field from '../Field';
import { FormState } from '../FormState';
import SubmitButton from '../SubmitButton';
import { FormConfigProvider } from './FormConfigContext';

type Props = FormProps;

class Form extends React.Component<Props> {
  static Field = Field;
  static SubmitButton = SubmitButton;

  render() {
    const { children, initialValues, style, testID } = this.props;

    return (
      <FormState initialValues={initialValues}>
        {formState => {
          const formBody =
            typeof children === 'function' ? children(formState) : children;
          return (
            <FormConfigProvider value={this.props}>
              <View style={style} testID={testID}>
                {formBody}
              </View>
            </FormConfigProvider>
          );
        }}
      </FormState>
    );
  }
}

export default Form;
