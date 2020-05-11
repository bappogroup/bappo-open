import React from 'react';

import { FormStateAndHelpersAndActions } from '../FormState/types';

export type SubmitButtonProps = {
  children?:
    | React.ReactNode
    | ((formState: FormStateAndHelpersAndActions) => React.ReactNode);
  disabled?: boolean;
  style?: any;
  testID?: string;
};
