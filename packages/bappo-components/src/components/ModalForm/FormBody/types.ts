import React from 'react';

export type FormBodyProps = {
  children?: React.ReactNode;
  contentContainerStyle?: any;
  onCancel?: (() => any) | null;
  onDelete?: (() => any) | null;
  onSubmit?: (() => any) | null;
  submitButtonText?: string;
  submitting?: boolean;
  testID?: string;
  title?: string;
  headerContainerStyle: {
    headerStyle: any;
    titleStyle: any;
    closeIconStyle: any;
  };
  footerContainerStyle: {
    footerStyle: any;
    cancelBtnStyle: any;
    submitBtnStyle: any;
    cancelBtnTextStyle: any;
  };
};
