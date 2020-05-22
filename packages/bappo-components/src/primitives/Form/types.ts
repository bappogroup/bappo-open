import React from 'react';

import {
  FieldState,
  FieldValidator,
  FormStateAndHelpersAndActions,
  Values,
} from './FormState/types';

export interface FormProps {
  /**
   * Overrides the text that's read by the screen reader when the user interacts with the element.
   */
  accessibilityLabel?: string;
  children?:
    | React.ReactNode
    | ((formState: FormStateAndHelpersAndActions) => React.ReactNode);
  initialValues?: Values;
  onSubmit?: (values: Values) => Promise<any>;
  style?: any;
  /**
   * Used to locate this view in end-to-end tests.
   */
  testID?: string;
}

export interface InputField {
  blur(): void;
  focus(): void;
}

export interface InputFieldProps<V> {
  fieldState?: FieldState<V>;
  label?: string;
  name?: string;
  onBlur?: () => void;
  onFocus?: () => void;
  onValueChange?: (value: V) => void;
  ref?: React.Ref<InputField>;
  required?: boolean;
  reserveErrorSpace?: boolean;
  testID?: string;
  validate?: FieldValidator<V> | FieldValidator<V>[];
  value?: V;
}

export type InputFieldComponent<
  V,
  P extends {
    [prop: string]: any;
  }
> = React.ComponentType<P & InputFieldProps<V>>;
