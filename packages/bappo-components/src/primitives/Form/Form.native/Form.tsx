import React from 'react';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Field } from '../Field';
import { FormState, SubmissionError } from '../FormState';
import SubmitButton from '../SubmitButton';
import { FormProps } from '../types';
import { FormConfigContext } from './FormConfigContext';

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
            typeof children === 'function'
              ? (children as any)(formState)
              : children;
          return (
            <FormConfigContext.Provider value={this.props}>
              <KeyboardAwareScrollView
                style={style}
                contentContainerStyle={{ flex: 1 }}
                testID={testID}
                keyboardShouldPersistTaps={'handled'}
              >
                {formBody}
              </KeyboardAwareScrollView>
            </FormConfigContext.Provider>
          );
        }}
      </FormState>
    );
  }
}

export default Form;
