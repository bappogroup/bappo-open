// @flow

import * as React from 'react';
import styled from 'styled-components';
import Text from '../../../primitives/Text';
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
  initialValues,
  onCancel,
  onSubmit,
  title,
}: FormBodyPropTypes) => {
  return (
    <StyledForm initialValues={initialValues} onSubmit={onSubmit}>
      {formState => {
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
            </ModalFormContent>
          </React.Fragment>
        );
      }}
    </StyledForm>
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
