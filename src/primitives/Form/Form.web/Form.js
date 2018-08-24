// @flow

import * as React from 'react';
import FlexForm from '../../../internals/web/FlexForm';
import type { FormProps } from '../types.js.flow';
import Field from '../Field';
import { FormState } from '../FormState';
import SubmitButton from '../SubmitButton';

type Props = FormProps & {
  // Will be removed
  className?: any,
};

class Form extends React.Component<Props> {
  static Field = Field;
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
        {formState => {
          const { fieldErrors, values, actions } = formState;
          const handleFormSubmit = e => {
            e.preventDefault();
            actions.touchAll();
            if (Object.keys(fieldErrors).length === 0) {
              actions.submit(() => onSubmit && onSubmit(values));
            }
          };
          const formBody =
            typeof children === 'function' ? children(formState) : children;
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
