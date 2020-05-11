import React from 'react';

export interface InputField {
  blur(): void;
  focus(): void;
}

export interface FieldState<V> {
  dirty: boolean;
  error?: string;
  pristine: boolean;
  touched: boolean;
  value?: V;
  visited: boolean;
}

export type FieldValidator<V> = (
  value: V | undefined,
  fieldState: FieldState<V>,
) => string | undefined;

export interface InputFieldProps<V> {
  fieldState?: FieldState<V>;
  label?: string;
  onBlur?: () => void;
  onFocus?: () => void;
  onValueChange?: (value: V) => void;
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
