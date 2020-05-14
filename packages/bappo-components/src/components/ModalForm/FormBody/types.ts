import React from 'react';

export type FormBodyProps = {
  children?: React.ReactNode;
  onCancel?: () => any;
  onDelete?: () => any;
  onSubmit?: () => any;
  submitButtonText?: string;
  submitting?: boolean;
  testID?: string;
  title?: string;
};
