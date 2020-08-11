import React from 'react';

import View from '../../View';
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
        {(formState) => {
          const formBody =
            typeof children === 'function'
              ? (children as any)(formState)
              : children;
          return (
            <FormConfigContext.Provider value={this.props}>
              <View style={style} testID={testID}>
                {formBody}
              </View>
            </FormConfigContext.Provider>
          );
        }}
      </FormState>
    );
  }
}

export default Form;
