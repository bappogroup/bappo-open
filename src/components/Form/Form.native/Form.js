// @flow

import * as React from 'react';
import { View } from 'react-native';
import type {
  FormStateAndHelpersAndActions,
  Values,
} from '../FormState/types.js.flow';
import { FormState } from '../FormState';
import { FormConfigProvider } from './FormConfigContext';
import Field from './Field';
import SubmitButton from './SubmitButton';

type Props = {
  children?:
    | ?React.Node
    | ((formState: FormStateAndHelpersAndActions) => React.Node),
  initialValues?: Values,
  onSubmit?: ?(values: Values) => mixed,
  style?: any,
};

class Form extends React.Component<Props> {
  static Field = Field;
  static SubmitButton = SubmitButton;

  render() {
    const { children, initialValues, style } = this.props;

    return (
      <FormState initialValues={initialValues}>
        {formState => {
          const formBody =
            typeof children === 'function' ? children(formState) : children;
          return (
            <FormConfigProvider value={this.props}>
              <View style={style}>{formBody}</View>
            </FormConfigProvider>
          );
        }}
      </FormState>
    );
  }
}

export default Form;
