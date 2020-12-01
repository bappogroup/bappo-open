import { ReactElement } from 'react';

import { ModalProps } from '../Modal/types';

export type ModalWizardState = {
  step: number;
  submitting: boolean;
  formValues: any;
};

export type ModalWizardProps = {
  startFromStep?: number;
  onFinish?: () => void;
  onRequestClose: () => void;
  screens: Array<ModalWizardScreen>;
  submitButtonText?: string;
  canSubmit?: boolean;
  visible?: boolean;
  placement?: ModalProps['placement'];
  testID?: string;
};

export type ModalWizardScreen = {
  title?: string;
  render: () => ReactElement;
  isForm?: boolean;
};
