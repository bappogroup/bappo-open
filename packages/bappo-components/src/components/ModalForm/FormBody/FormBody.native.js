// @flow

import * as React from 'react';
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
import FormBodyDefaultProps from './defaultProps';
import type { FormBodyPropTypes } from './types.js.flow';

const FormBody = ({
  children,
  onCancel,
  onDelete,
  onSubmit,
  submitButtonText,
  testID,
  title,
}: FormBodyPropTypes) => {
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
        <ModalFormContent>
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

FormBody.defaultProps = FormBodyDefaultProps;

const StyledForm = styled(View)`
  flex: 1;
`;

export const ModalFormTitleText = styled(Text).attrs({
  numberOfLines: 2,
})`
  ${modalFormMobileTitleTextStyle};
`;

const ModalFormHeaderContainer = styled.SafeAreaView`
  ${modalFormMobileHeaderContainerStyle};
`;
const ModalFormHeaderInnerContainer = styled.View`
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
