import React from 'react';

export type FormBodyProps = {
  children?: React.ReactNode;
  contentContainerStyle?: any;
  onCancel?: () => any;
  onDelete?: () => any;
  onSubmit?: () => any;
  submitButtonText?: string;
  submitting?: boolean;
  testID?: string;
  title?: string;
};
