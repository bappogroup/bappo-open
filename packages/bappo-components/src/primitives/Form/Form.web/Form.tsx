import React from 'react';

import FlexForm from '../../../internals/web/FlexForm';
import { Field } from '../Field';
import { FormState, SubmissionError } from '../FormState';
import { FormStateAndHelpersAndActions } from '../FormState/types';
import SubmitButton from '../SubmitButton';
import { FormProps } from '../types';

type Props = FormProps & {
  // Will be removed
  className?: any;
};

class Form extends React.Component<Props> {
  static Field = Field;
  static SubmissionError = SubmissionError;
  static SubmitButton = SubmitButton;

  render() {
    const {
      children,
      className,
      initialValues,
      onSubmit,
      style,
      testID,
    } = this.props;

    return (
      <FormState initialValues={initialValues}>
        {(formState: FormStateAndHelpersAndActions) => {
          const { fieldErrors, values, actions } = formState;
          const handleFormSubmit = (e: React.FormEvent) => {
            e.preventDefault();
            actions.touchAll();
            if (Object.keys(fieldErrors).length === 0) {
              actions.submit(() => onSubmit && onSubmit(values));
            }
          };
          const formBody =
            typeof children === 'function'
              ? (children as any)(formState)
              : children;
          return (
            <FlexForm
              className={className}
              data-testid={testID}
              onSubmit={handleFormSubmit}
              style={style}
            >
              {formBody}
            </FlexForm>
          );
        }}
      </FormState>
    );
  }
}

export default Form;
