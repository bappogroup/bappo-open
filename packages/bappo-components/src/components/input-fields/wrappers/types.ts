import React from 'react';

import { InputFieldProps } from '../../../primitives/Form/types';

export type InputWrapperProps<V> = Pick<
  InputFieldProps<V>,
  'label' | 'onValueChange' | 'required' | 'reserveErrorSpace' | 'testID'
> & {
  children?: React.ReactNode;
  fieldState: NonNullable<InputFieldProps<V>['fieldState']>;
  focusInput?: () => void;
  style?: any;
  // Will be removed
  className?: string;
};
