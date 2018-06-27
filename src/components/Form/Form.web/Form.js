// @flow

import * as React from 'react';
import FlexForm from '../../../internals/web/FlexForm';
import type {
  FormStateAndHelpersAndActions,
  Values,
} from '../FormState/types.js.flow';
import Field from '../Field';
import { FormState } from '../FormState';
import SubmitButton from './SubmitButton';

type Props = {
  children?:
    | ?React.Node
    | ((formState: FormStateAndHelpersAndActions) => React.Node),
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
