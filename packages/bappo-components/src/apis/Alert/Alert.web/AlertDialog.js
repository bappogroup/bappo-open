import * as React from 'react';
import styled from 'styled-components';

import Button from '../../../components/Button';
import { modalFormContentStyle } from '../../../components/ModalForm/StyledComponents';
import Paragraph from '../../../components/Paragraph';
import { breakpoint } from '../../../internals/web/breakpoint';
import FlexDiv from '../../../internals/web/FlexDiv';
import { DivViewBase } from '../../../internals/web/ViewBase';
import Text from '../../../primitives/Text';
import View from '../../../primitives/View';
import AlertDefaultProps from '../defaultProps';
import type { AlertOptions } from '../types.js.flow';

type Props = AlertOptions & {
  onDismiss: () => any,
};

class AlertDialog extends React.Component<Props> {
  static defaultProps = AlertDefaultProps;

  createActionButtonHandler = (onPress: ?() => void) => (value) => {
    const { onDismiss } = this.props;
    onDismiss(value);
    onPress && onPress();
  };

  confirmButton = () => {
    const { actions } = this.props;
    const onPress = this.createActionButtonHandler(
      actions.confirm && actions.confirm.onPress,
    );
    return (
      <Button
        text={(actions.confirm && actions.confirm.text) || 'Ok'}
        onPress={() => onPress('confirm')}
        type={
          actions.confirm && actions.confirm.destructive
            ? 'destructive'
            : 'primary'
        }
      />
    );
  };

  cancelButton = () => {
    const { actions } = this.props;
    const onPress = this.createActionButtonHandler(
      actions.cancel && actions.cancel.onPress,
    );
    return (
      actions.confirm &&
      actions.cancel && (
        <Button
          type="secondary"
          onPress={() => onPress('cancel')}
          text={(actions.cancel && actions.cancel.text) || 'Cancel'}
          style={{ marginRight: 8 }}
        />
      )
    );
  };

  neutralButton = () => {
    const { actions } = this.props;
    const onPress = this.createActionButtonHandler(
      actions.neutral && actions.neutral.onPress,
    );
    return (
      actions.confirm &&
      actions.cancel &&
      actions.neutral && (
        <Button
          type="tertiary"
          onPress={() => onPress('neutral')}
          text={(actions.neutral && actions.neutral.text) || 'Ask Me Later'}
        />
      )
    );
  };

  render() {
    const { message, title } = this.props;
    return (
      <AlertContentContainer>
        <StyledView>
          {title && (
            <AlertFormHeader>
              <AlertFormTitleText>{title}</AlertFormTitleText>
            </AlertFormHeader>
          )}
          <AlertFormContent>
            <Paragraph>{message}</Paragraph>
          </AlertFormContent>
          <AlertFormFooter>
            <AlertFormRow>{this.neutralButton()}</AlertFormRow>
            <AlertFormRow>
              {this.cancelButton()}
              {this.confirmButton()}
            </AlertFormRow>
          </AlertFormFooter>
        </StyledView>
      </AlertContentContainer>
    );
  }
}

export default AlertDialog;

export const AlertContentContainer = styled(DivViewBase).attrs((props) => ({
  tabIndex: -1,
}))`
  background-color: white;
  border-radius: 4px;
  overflow: hidden;
  margin: auto;
  max-height: 576px;
  min-height: 140px;
  outline: none;

  @media (max-width: ${breakpoint.max}px) {
    width: calc(100% - 40px);
  }

  @media (min-width: ${breakpoint.min}px) {
    width: 400px;
  }
`;

const StyledView = styled(View)`
  flex: 1;
  align-items: stretch;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  position: relative;
  min-height: 0;
  min-width: 0;
`;

const AlertFormTitleText = styled(Text)`
  font-size: 20px;
  color: #2b2826;
  line-height: 20px;
`;

const AlertFormHeader = styled(FlexDiv)`
  flex: none;
  flex-direction: row;
  background-color: white;
  border-bottom: 1px solid #dddbda;
  height: 55px;
  align-items: center;
  justify-content: center;
`;

const AlertFormContent = styled(FlexDiv)`
  flex: 1;
  background-color: white;
  padding: 24px;

  @media (max-width: ${breakpoint.max}px) {
    ${modalFormContentStyle};
  }
`;

const AlertFormFooter = styled(FlexDiv)`
  flex: none;
  flex-direction: row;
  justify-content: space-between;
  background-color: #fbfbfb;
  border-top: 1px solid #eee;
  height: 64px;
  padding: 16px;

  @media (max-width: ${breakpoint.max}px) {
    height: 48px;
    padding: 8px;
  }
`;

const AlertFormRow = styled(FlexDiv)`
  display: flex;
  flex-direction: row;
`;
