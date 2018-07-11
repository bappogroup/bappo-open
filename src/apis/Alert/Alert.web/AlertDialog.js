// @flow

import * as React from 'react';
import styled from 'styled-components';
import FlexButton from '../../../internals/web/FlexButton';
import FlexDiv from '../../../internals/web/FlexDiv';
import Text from '../../../primitives/Text';
import Colors from '../../Colors';
import type { AlertOptions } from '../types.js.flow';
import AlertDefaultProps from '../defaultProps';

type Props = AlertOptions & {
  onDismiss: () => any,
};

const ActionButtonColorMap = {
  default: Colors.BLACK,
  cancel: Colors.BLACK,
  destructive: Colors.RED,
};

const AlertDialog = ({ actions, message, onDismiss, title }: Props) => {
  let neutralAction;
  let otherActions;
  if (actions.length === 3) {
    [neutralAction, ...otherActions] = actions;
  } else {
    otherActions = actions;
  }

  const createActionButtonHandler = onPress => () => {
    onDismiss();
    onPress && onPress();
  };

  return (
    <AlertContainer>
      <AlertContentArea>
        {title && <AlertTitle>{title}</AlertTitle>}
        <AlertMessage>{message}</AlertMessage>
      </AlertContentArea>
      <AlertActionArea>
        {neutralAction && (
          <ActionButton
            onClick={createActionButtonHandler(neutralAction.onPress)}
          >
            <ActionButtonText
              color={ActionButtonColorMap[neutralAction.style || 'default']}
            >
              {neutralAction.text}
            </ActionButtonText>
          </ActionButton>
        )}
        <AlertRightActionArea>
          {otherActions.map((action, index) => (
            <ActionButton
              key={index}
              onClick={createActionButtonHandler(action.onPress)}
            >
              <ActionButtonText
                color={ActionButtonColorMap[action.style || 'default']}
              >
                {action.text}
              </ActionButtonText>
            </ActionButton>
          ))}
        </AlertRightActionArea>
      </AlertActionArea>
    </AlertContainer>
  );
};

AlertDialog.defaultProps = AlertDefaultProps;

export default AlertDialog;

const AlertContainer = styled(FlexDiv)`
  background-color: white;
  min-width: 300px;
`;

const AlertContentArea = styled(FlexDiv)`
  flex: none;
  padding-top: 24px;
`;

const AlertActionArea = styled(FlexDiv)`
  flex: none;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  height: 52px;
  padding: 8px 0 8px 24px;
`;

const AlertRightActionArea = styled(FlexDiv)`
  flex-direction: row;
  align-items: center;
`;

const AlertTitle = styled(Text)`
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 20px;
  padding: 0 24px 20px 24px;
`;

const AlertMessage = styled(Text)`
  font-size: 16px;
  padding: 0 24px 24px 24px;
`;

const ActionButton = styled(FlexButton)`
  align-items: center;
  justify-content: center;
  height: 36px;
  margin-right: 8px;
  min-width: 64px;
`;

const ActionButtonText = styled(Text)`
  font-size: 16px;
  color: ${props => props.color};
`;
