// @flow

import * as React from 'react';
import MediaQuery from 'react-responsive';
import styled from 'styled-components';
import Icon from '../../../components/Icon';
import { breakpoint } from '../../../internals/web/breakpoint';
import FlexDiv from '../../../internals/web/FlexDiv';
import FlexForm from '../../../internals/web/FlexForm';
import { Form } from '../../../primitives/Form';
import Text from '../../../primitives/Text';
import TouchableView from '../../../primitives/TouchableView';
import Button from '../../Button';
import ButtonSpinner from '../../Button/ButtonSpinner';
import { buttonContainerStyle, buttonTextStyle } from '../../Button/styles';
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

type State = {
  deleting: boolean,
};

class FormBody extends React.Component<FormBodyPropTypes, State> {
  static defaultProps = FormBodyDefaultProps;

  state = {
    deleting: false,
  };

  componentDidMount() {
    this._isMounted = true;
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    const {
      children,
      onCancel,
      onDelete,
      submitButtonText,
      testID,
      title,
    } = this.props;

    return (
      <StyledForm data-testid={testID} onSubmit={this._onFormSubmit}>
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
              <ModalFormMobileDeleteButton
                loading={this.state.deleting}
                onPress={this._onDelete}
                text="Delete"
              />
            </MediaQuery>
          )}
        </ModalFormContent>
        <MediaQuery minWidth={breakpoint.min}>
          <ModalFormFooter>
            <ModalFormRow>
              {onDelete && (
                <ModalFormFooterDeleteButton
                  loading={this.state.deleting}
                  onPress={this._onDelete}
                  text="Delete"
                />
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
  }

  _isMounted = false;

  _onDelete = async () => {
    const { onDelete } = this.props;
    if (onDelete) {
      this.setState({
        deleting: true,
      });
      try {
        await onDelete();
      } finally {
        if (this._isMounted) {
          this.setState({
            deleting: false,
          });
        }
      }
    }
  };

  _onFormSubmit = (event: SyntheticEvent<>) => {
    event.preventDefault();
    this.props.onSubmit && this.props.onSubmit();
  };
}

export default FormBody;

const StyledForm = styled(FlexForm)`
  flex: 1;
`;

const ModalFormTitleText = styled(Text).attrs({
  numberOfLines: 2,
})`
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
    ${modalFormMobileHeaderContainerStyle};
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
  overflow-y: auto;
  padding: 48px;

  @media (max-width: ${breakpoint.max}px) {
    ${modalFormContentStyle};
    overflow-y: auto;
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

const submitButtonStyleProps = {
  type: 'primary',
};
const StyledSubmitButton = styled(Form.SubmitButton).attrs(
  submitButtonStyleProps,
)`
  ${buttonContainerStyle};
`;
const SubmitButtonText = styled(Text).attrs(submitButtonStyleProps)`
  ${buttonTextStyle};
`;
const ModalFormFooterSubmitButton = ({ text }) => {
  return (
    <StyledSubmitButton text={text}>
      {({ submitting }) => {
        return (
          <React.Fragment>
            <SubmitButtonText>{text}</SubmitButtonText>
            {submitting && <ButtonSpinner {...submitButtonStyleProps} />}
          </React.Fragment>
        );
      }}
    </StyledSubmitButton>
  );
};
