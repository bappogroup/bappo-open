// @flow

import * as React from 'react';
import MediaQuery from 'react-responsive';
import styled from 'styled-components';
import Icon from '../../../components/Icon';
import { breakpoint } from '../../../internals/web/breakpoint';
import FlexDiv from '../../../internals/web/FlexDiv';
import FlexForm from '../../../internals/web/FlexForm';
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
  modalFormContentStyle,
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
  const handleFormSubmit = e => {
    e.preventDefault();
    onSubmit && onSubmit();
  };

  return (
    <StyledForm data-testid={testID} onSubmit={handleFormSubmit}>
      <ModalFormHeader>
        <MediaQuery minWidth={breakpoint.min}>
          <ModalFormCloseButton onPress={onCancel} />
        </MediaQuery>
        <MediaQuery maxWidth={breakpoint.max}>
          <ModalFormHeaderMobileContainer>
            <ModalFormHeaderCancelButton onPress={onCancel} />
            <ModalFormHeaderSubmitButton text={submitButtonText} />
          </ModalFormHeaderMobileContainer>
        </MediaQuery>
        <ModalFormTitleContainer>
          <ModalFormTitleText>{title}</ModalFormTitleText>
        </ModalFormTitleContainer>
      </ModalFormHeader>
      <ModalFormContent>
        {children}
        {onDelete && (
          <MediaQuery maxWidth={breakpoint.max}>
            <ModalFormMobileDeleteButton onPress={onDelete} text="Delete" />
          </MediaQuery>
        )}
      </ModalFormContent>
      <MediaQuery minWidth={breakpoint.min}>
        <ModalFormFooter>
          <ModalFormRow>
            {onDelete && (
              <ModalFormFooterDeleteButton onPress={onDelete} text="Delete" />
            )}
          </ModalFormRow>
          <ModalFormRow>
            <ModalFormFooterCancelButton onPress={onCancel} text="Cancel" />
            <ModalFormFooterSubmitButton text={submitButtonText} />
          </ModalFormRow>
        </ModalFormFooter>
      </MediaQuery>
    </StyledForm>
  );
};

FormBody.defaultProps = FormBodyDefaultProps;

export default FormBody;

const StyledForm = styled(FlexForm)`
  flex: 1;
`;

const ModalFormTitleText = styled(Text)`
  font-size: 20px;
  color: #2b2826;
  line-height: 20px;

  @media (max-width: ${breakpoint.max}px) {
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

  @media (max-width: ${breakpoint.max}px) {
    ${modalFormMobileHeaderStyle};
  }
`;

const ModalFormCloseButtonContainer = styled(TouchableView)`
  align-items: center;
  justify-content: center;
  margin-left: auto;
  padding: 20px;
`;
const ModalFormCloseButton = props => (
  <ModalFormCloseButtonContainer {...props}>
    <Icon name="clear" />
  </ModalFormCloseButtonContainer>
);

const ModalFormHeaderMobileContainer = styled(FlexDiv)`
  display: flex;
  flex: 1;
  flex-direction: row;
  justify-content: space-between;
`;

const ModalFormMobileDeleteButton = styled(Button).attrs({
  type: 'destructive',
})``;

const ModalFormContent = styled(FlexDiv)`
  flex: 1;
  background-color: white;
  overflow-y: scroll;
  padding: 48px;

  @media (max-width: ${breakpoint.max}px) {
    ${modalFormContentStyle};
    overflow-y: scroll;
  }
`;

const ModalFormFooter = styled(FlexDiv)`
  flex: none;
  flex-direction: row;
  justify-content: space-between;
  background-color: #f1f1f0;
  border-top: 1px solid #dddbda;
  height: 64px;
  padding: 16px;
`;

const ModalFormRow = styled(FlexDiv)`
  display: flex;
  flex-direction: row;
`;

const ModalFormFooterCancelButton = styled(Button).attrs({
  type: 'secondary',
})`
  margin-right: 16px;
`;

const ModalFormFooterDeleteButton = styled(Button).attrs({
  type: 'destructive',
})``;

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
