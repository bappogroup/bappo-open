import React from 'react';

import {
  InputField,
  InputFieldComponent,
} from '../../components/input-fields/types';
import { useFieldState } from './FormState';
import { FieldValidator } from './FormState/types';

interface InternalProps<
  V,
  InputProps extends {
    [prop: string]: any;
  }
> {
  component: InputFieldComponent<V, InputProps>;
  inputRef: React.Ref<InputField>;
  label: string;
  name: string;
  props: InputProps;
  testID?: string;
  validate?: FieldValidator | FieldValidator[];
}
type Props<
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
>({
  component,
  inputRef,
  label,
  name,
  props, // This prop may be `undefined`. Handle with care.
  testID,
  validate,
}: InternalProps<V, InputProps>) {
  const {
    active,
    dirty,
    error,
    pristine,
    touched,
    value,
    visited,
    formState,
  } = useFieldState({
    name,
    validate,
  });

  const { actions } = formState;
  const fieldState = {
    active,
    dirty,
    error,
    pristine,
    touched,
    value,
    visited,
  };
  return React.createElement(component, {
    fieldState,
    label,
    testID: testID || `${name}-field`,
    value,
    ...props,
    onBlur: () => {
      props && typeof props.onBlur === 'function' && props.onBlur();
      actions.blur(name);
    },
    onFocus: () => {
      props && typeof props.onFocus === 'function' && props.onFocus();
      actions.focus(name);
    },
    onValueChange: value => {
      props &&
        typeof props.onValueChange === 'function' &&
        props.onValueChange(value);
      actions.changeValue(name, value);
    },
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
    props: Props<V, InputProps>,
    ref: React.Ref<InputField>,
  ) => {
    return (
      // @ts-ignore
      <InternalField {...props} inputRef={ref} props={props.props || {}} />
    );
  },
);
