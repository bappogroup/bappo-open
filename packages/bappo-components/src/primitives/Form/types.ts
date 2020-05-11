import React from 'react';

import { FormStateAndHelpersAndActions, Values } from './FormState/types';

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
