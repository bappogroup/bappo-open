// @flow

import * as React from 'react';
import type { InputFieldComponent } from '../../input-fields/types.js.flow';
import type { FieldValidator } from '../FormState/types.js.flow';
import { FieldState } from '../FormState';

type RequiredProps = {
  component: Class<InputFieldComponent>,
  label: string,
  name: string,
};
type OptionalProps = {
  props?: ?{},
  validate?: FieldValidator | FieldValidator[],
};
type Props = RequiredProps & OptionalProps;

// $FlowFixMe: forwardRef is not supported yet
export default React.forwardRef((props: Props, ref) => {
  const { component, label, name, validate } = props;

  if (!name) {
    throw new Error(`Field name is required`);
  }
  if (!component) {
    throw new Error(`Field component is required`);
  }

  return (
    <FieldState name={name} validate={validate}>
      {({ error, touched, value, formState }) => {
        const { actions } = formState;
        return React.createElement(component, {
          error: touched ? error : '',
          label,
          onBlur: () => actions.blur(name),
          onFocus: () => actions.focus(name),
          onValueChange: value => actions.changeValue(name, value),
          value,
          ...(props || {}),
          ref,
        });
      }}
    </FieldState>
  );
});
