// @flow

import * as React from 'react';
import styled from 'styled-components';
import Icon from '../../../components/Icon';
import FlexDiv from '../../../internals/web/FlexDiv';
import ActivityIndicator from '../../../primitives/ActivityIndicator';
import { Form } from '../../../primitives/Form';
import Text from '../../../primitives/Text';
import TouchableView from '../../../primitives/TouchableView';
import Button from '../../Button';
import { buttonContainerStyle, buttonTextStyle } from '../../Button/styles';
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
  onClose,
  onSubmit,
  title,
}: FormBodyPropTypes) => {
  return (
    <StyledForm initialValues={initialValues} onSubmit={onSubmit}>
      {formState => {
        return (
          <React.Fragment>
            <ModalFormHeader>
              <ModalFormCloseButton onPress={onClose} />
              <ModalFormHeaderMobileContainer>
                <ModalFormHeaderCancelButton onPress={onCancel} />
                <ModalFormHeaderSubmitButton />
              </ModalFormHeaderMobileContainer>
              <ModalFormTitleContainer>
                <ModalFormTitleText>{title}</ModalFormTitleText>
              </ModalFormTitleContainer>
            </ModalFormHeader>
            <ModalFormContent>
              {typeof children === 'function' ? children(formState) : children}
            </ModalFormContent>
            <ModalFormFooter>
              <ModalFormFooterCancelButton onPress={onCancel} text="Cancel" />
              <ModalFormFooterSubmitButton text="Submit" />
            </ModalFormFooter>
          </React.Fragment>
        );
      }}
    </StyledForm>
  );
};

export default FormBody;

const ModalFormTitleText = styled(Text)`
  font-size: 20px;
  color: #2b2826;
  line-height: 20px;

  @media (max-width: 576px) {
    ${modalFormMobileTitleTextStyle};
  }
`;

const ModalFormHeader = styled(FlexDiv)`
  flex: none;
  flex-direction: row;
  justify-content: space-between;
  background-color: white;
  border-bottom: 1px solid #dddbda;
  height: 55px;

  @media (max-width: 576px) {
    ${modalFormMobileHeaderStyle};
  }
`;

const ModalFormCloseButtonContainer = styled(TouchableView)`
  align-items: center;
  justify-content: center;
  margin-left: auto;
  padding: 20px;

  @media (max-width: 576px) {
    display: none;
  }
`;
const ModalFormCloseButton = props => (
  <ModalFormCloseButtonContainer {...props}>
    <Icon name="clear" />
  </ModalFormCloseButtonContainer>
);

const ModalFormHeaderMobileContainer = styled(FlexDiv)`
  display: none;

  @media (max-width: 576px) {
    display: flex;
    flex: 1;
    flex-direction: row;
    justify-content: space-between;
  }
`;

const ModalFormContent = styled(FlexDiv)`
  flex: 1;
  background-color: white;
  padding: 48px;

  @media (max-width: 576px) {
    ${modalFormContentStyle};
  }
`;

const ModalFormFooter = styled(FlexDiv)`
  flex: none;
  flex-direction: row;
  justify-content: flex-end;
  background-color: #f1f1f0;
  border-top: 1px solid #dddbda;
  height: 64px;
  padding: 16px;

  @media (max-width: 576px) {
    display: none;
  }
`;

const ModalFormFooterCancelButton = styled(Button).attrs({
  type: 'secondary',
})`
  margin-right: 16px;
`;

const StyledSubmitButton = styled(Form.SubmitButton).attrs({
  type: 'primary',
})`
  ${buttonContainerStyle};
`;
const SubmitButtonText = styled(Text).attrs({
  type: 'primary',
})`
  ${buttonTextStyle};
`;
const ModalFormFooterSubmitButton = ({ text }) => (
  <StyledSubmitButton text={text}>
    {({ submitting }) =>
      submitting ? (
        <ActivityIndicator />
      ) : (
        <SubmitButtonText>{text}</SubmitButtonText>
      )
    }
  </StyledSubmitButton>
);
