import React from 'react';

import { InputFieldProps } from '../types';

export type InputWrapperProps<V> = Pick<
  InputFieldProps<V>,
  | 'label'
  | 'onValueChange'
  | 'required'
  | 'reserveErrorSpace'
  | 'testID'
  | 'value'
> & {
  children?: React.ReactNode;
  fieldState: NonNullable<InputFieldProps<V>['fieldState']>;
  focusInput?: () => void;
  style?: any;
  // Will be removed
  className?: string;
};
