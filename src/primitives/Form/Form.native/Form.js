// @flow

import * as React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import type { FormProps } from '../types.js.flow';
import Field from '../Field';
import { FormState, SubmissionError } from '../FormState';
import SubmitButton from '../SubmitButton';
import { FormConfigProvider } from './FormConfigContext';

type Props = FormProps;

class Form extends React.Component<Props> {
  static Field = Field;
  static SubmissionError = SubmissionError;
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
              <KeyboardAwareScrollView
                style={style}
                testID={testID}
                keyboardShouldPersistTaps={'handled'}
              >
                {formBody}
              </KeyboardAwareScrollView>
            </FormConfigProvider>
          );
        }}
      </FormState>
    );
  }
}

export default Form;
