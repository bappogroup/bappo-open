// @flow

import * as React from 'react';
import styled from 'styled-components';
import Text from '../../../primitives/Text';
import Button from '../../Button';
import {
  ModalFormHeaderCancelButton,
  ModalFormHeaderSubmitButton,
  ModalFormTitleContainer,
  StyledForm,
  modalFormContentStyle,
  modalFormMobileHeaderStyle,
  modalFormMobileTitleTextStyle,
} from '../StyledComponents';
import type { FormBodyPropTypes } from './types.js.flow';

const FormBody = ({
  children,
  onCancel,
  onDelete,
  title,
  formState,
}: FormBodyPropTypes) => {
  return (
    <React.Fragment>
      <ModalFormHeader>
        <ModalFormHeaderCancelButton onPress={onCancel} />
        <ModalFormHeaderSubmitButton />
        <ModalFormTitleContainer>
          <ModalFormTitleText>{title}</ModalFormTitleText>
        </ModalFormTitleContainer>
      </ModalFormHeader>
      <ModalFormContent>
        {typeof children === 'function' ? children(formState) : children}
        <ModalFormHeaderDeleteButton onPress={onDelete} text="Delete" />
      </ModalFormContent>
    </React.Fragment>
  );
};

export default FormBody;

const ModalFormTitleText = styled(Text)`
  ${modalFormMobileTitleTextStyle};
`;

const ModalFormHeader = styled.SafeAreaView`
  ${modalFormMobileHeaderStyle};
`;

const ModalFormContent = styled.View`
  ${modalFormContentStyle};
`;

const ModalFormHeaderDeleteButton = styled(Button).attrs({
  type: 'destructive',
})`
  display: none;

  @media (max-width: 576px) {
    display: flex;
  }
`;
