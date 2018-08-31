// @flow

import * as React from 'react';
import type { InputFieldComponent } from '../../components/input-fields/types.js.flow';
import type { FieldValidator } from './FormState/types.js.flow';
import { FieldState } from './FormState';

type RequiredProps = {
  component: Class<InputFieldComponent>,
  label: string,
  name: string,
};
type OptionalProps = {
  props?: {},
  testID?: string,
  validate?: FieldValidator | FieldValidator[],
};
type Props = RequiredProps & OptionalProps;

// $FlowFixMe: forwardRef is not supported yet
export default React.forwardRef((fieldProps: Props, ref) => {
  const { component, label, name, props = {}, testID, validate } = fieldProps;

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
          testID: testID || `${name}-field`,
          value,
          ...props,
          onBlur: () => {
            typeof props.onBlur === 'function' && props.onBlur();
            actions.blur(name);
          },
          onFocus: () => {
            typeof props.onFocus === 'function' && props.onFocus();
            actions.focus(name);
          },
          onValueChange: value => {
            typeof props.onValueChange === 'function' &&
              props.onValueChange(value);
            actions.changeValue(name, value);
          },
          ref,
        });
      }}
    </FieldState>
  );
});
