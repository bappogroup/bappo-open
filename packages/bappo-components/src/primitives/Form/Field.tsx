import React from 'react';

import { FieldValidator } from './FormState/types';
import { InputField, InputFieldComponent } from './types';
import { useFieldState } from './useFieldState';

type InternalProps<
  V,
  InputProps extends {
    [prop: string]: any;
  }
> = {
  component: InputFieldComponent<V, InputProps>;
  inputRef: React.Ref<InputField>;
  label: string;
  name: string;
  props: InputProps;
  testID?: string;
  validate?: FieldValidator<V> | FieldValidator<V>[];
};
type FieldProps<
  V,
  InputProps extends {
    [prop: string]: any;
  }
> = Omit<InternalProps<V, InputProps>, 'inputRef' | 'props'> & {
  // make props optional for backwards compatibility
  props?: InputProps;
};

function InternalField<
  V,
  InputProps extends {
    [prop: string]: any;
  }
>(props: InternalProps<V, InputProps>) {
  const {
    component,
    inputRef,
    label,
    name,
    props: inputProps,
    testID,
    validate,
  } = props;
  const { fieldState, onBlur, onFocus, onValueChange } = useFieldState({
    name,
    validate,
  });

  return React.createElement(component, {
    fieldState,
    label,
    testID: testID || `${name}-field`,
    value: fieldState.value,
    ...inputProps,
    onBlur,
    onFocus,
    onValueChange,
    ref: inputRef,
  });
}

export const Field = React.forwardRef(
  <
    V,
    InputProps extends {
      [prop: string]: any;
    }
  >(
    props: FieldProps<V, InputProps>,
    ref: React.Ref<InputField>,
  ) => {
    return (
      // @ts-ignore
      <InternalField {...props} inputRef={ref} props={props.props || {}} />
    );
  },
);
