// @flow

import * as React from 'react';
import styled from 'styled-components';
import { FormConfigProvider } from '../../../primitives/Form/Form.native/FormConfigContext';
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
import type { FormBodyPropTypes } from './types.js.flow';
import FormBodyDefaultProps from './defaultProps';

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
    <FormConfigProvider value={{ onSubmit }}>
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
    </FormConfigProvider>
  );
};

export default FormBody;

FormBody.defaultProps = FormBodyDefaultProps;

const StyledForm = styled.View`
  flex: 1;
`;

const ModalFormTitleText = styled(Text).attrs({
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
const ModalFormHeader = ({ children }) => {
  return (
    <ModalFormHeaderContainer>
      <ModalFormHeaderInnerContainer>{children}</ModalFormHeaderInnerContainer>
    </ModalFormHeaderContainer>
  );
};

const ModalFormContent = styled.ScrollView`
  ${modalFormContentStyle};
`;

const ModalFormDeleteButton = styled(Button).attrs({
  type: 'destructive',
})``;
