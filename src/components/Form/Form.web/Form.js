// @flow

import * as React from 'react';
import type { Values } from '../FormState/types.js.flow';
import { FormState } from '../FormState';
import Field from './Field';
import SubmitButton from './SubmitButton';

type Props = {
  children?: ?React.Node,
  initialValues?: Values,
  onSubmit?: ?(values: Values) => mixed,
  style?: any,
  // Will be removed
  className?: any,
};

class Form extends React.Component<Props> {
  static Field = Field;
  static SubmitButton = SubmitButton;

  render() {
    const { children, className, initialValues, onSubmit, style } = this.props;

    return (
      <FormState initialValues={initialValues}>
        {({ fieldErrors, values, submit, touchAll }) => {
          const handleFormSubmit = e => {
            e.preventDefault();
            touchAll();
            if (Object.keys(fieldErrors).length === 0) {
              submit(() => onSubmit && onSubmit(values));
            }
          };
          return (
            <form
              className={className}
              onSubmit={handleFormSubmit}
              style={style}
            >
              {children}
            </form>
          );
        }}
      </FormState>
    );
  }
}

export default Form;
