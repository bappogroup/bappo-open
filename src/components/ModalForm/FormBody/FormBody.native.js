// @flow

import * as React from 'react';
import styled from 'styled-components';
import FormConfigProvider from '../../../primitives/Form/Form.native/FormConfigContext';
import Text from '../../../primitives/Text';
import Button from '../../Button';
import {
  ModalFormHeaderCancelButton,
  ModalFormHeaderSubmitButton,
  ModalFormTitleContainer,
  modalFormContentStyle,
  modalFormMobileHeaderStyle,
  modalFormMobileTitleTextStyle,
} from '../StyledComponents';
import type { FormBodyPropTypes } from './types.js.flow';

const FormBody = ({
  children,
  onCancel,
  onDelete,
  onSubmit,
  title,
}: FormBodyPropTypes) => {
  return (
    <FormConfigProvider value={{ onSubmit }}>
      <StyledForm>
        <ModalFormHeader>
          <ModalFormHeaderCancelButton onPress={onCancel} />
          <ModalFormHeaderSubmitButton />
          <ModalFormTitleContainer>
            <ModalFormTitleText>{title}</ModalFormTitleText>
          </ModalFormTitleContainer>
        </ModalFormHeader>
        <ModalFormContent>
          {children}
          <ModalFormDeleteButton onPress={onDelete} text="Delete" />
        </ModalFormContent>
      </StyledForm>
    </FormConfigProvider>
  );
};

export default FormBody;

const StyledForm = styled.View`
  flex: 1;
`;

const ModalFormTitleText = styled(Text)`
  ${modalFormMobileTitleTextStyle};
`;

const ModalFormHeader = styled.SafeAreaView`
  ${modalFormMobileHeaderStyle};
`;

const ModalFormContent = styled.View`
  ${modalFormContentStyle};
`;

const ModalFormDeleteButton = styled(Button).attrs({
  type: 'destructive',
})``;
