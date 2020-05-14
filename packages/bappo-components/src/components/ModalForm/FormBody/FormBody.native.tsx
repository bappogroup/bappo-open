import React from 'react';
import { View } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import styled from 'styled-components';

import { FormConfigContext } from '../../../primitives/Form/Form.native/FormConfigContext';
import Text from '../../../primitives/Text';
import Button from '../../Button';
import {
  ModalFormHeaderCancelButton,
  ModalFormHeaderSubmitButton,
  ModalFormTitleContainer,
  modalFormContentStyle,
  modalFormMobileHeaderContainerStyle,
  modalFormMobileHeaderStyle,
  modalFormMobileTitleTextStyle,
} from '../StyledComponents';
import { FormBodyProps } from './types';

const FormBody = ({
  children,
  contentContainerStyle,
  onCancel,
  onDelete,
  onSubmit,
  submitButtonText = 'Submit',
  testID,
  title,
}: FormBodyProps) => {
  return (
    <FormConfigContext.Provider value={{ onSubmit }}>
      <StyledForm testID={testID}>
        <ModalFormHeader>
          <ModalFormHeaderCancelButton onPress={onCancel} />
          <ModalFormHeaderSubmitButton text={submitButtonText} />
          <ModalFormTitleContainer>
            <ModalFormTitleText>{title}</ModalFormTitleText>
          </ModalFormTitleContainer>
        </ModalFormHeader>
        <ModalFormContent contentContainerStyle={contentContainerStyle}>
          {children}
          {onDelete && (
            <ModalFormDeleteButton onPress={onDelete} text="Delete" />
          )}
        </ModalFormContent>
      </StyledForm>
    </FormConfigContext.Provider>
  );
};

export default FormBody;

const StyledForm = styled(View)`
  flex: 1;
`;

export const ModalFormTitleText = styled(Text).attrs({
  numberOfLines: 2,
})`
  ${modalFormMobileTitleTextStyle};
`;

const ModalFormHeaderContainer = (styled as any).SafeAreaView`
  ${modalFormMobileHeaderContainerStyle};
`;
const ModalFormHeaderInnerContainer = (styled as any).View`
  ${modalFormMobileHeaderStyle};
`;
export const ModalFormHeader = ({ children }) => {
  return (
    <ModalFormHeaderContainer>
      <ModalFormHeaderInnerContainer>{children}</ModalFormHeaderInnerContainer>
    </ModalFormHeaderContainer>
  );
};

const ModalFormContent = styled(KeyboardAwareScrollView)`
  ${modalFormContentStyle};
`;

const ModalFormDeleteButton = styled(Button).attrs({
  type: 'destructive',
})``;
