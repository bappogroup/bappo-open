// @flow

import * as React from 'react';
import { styled, css } from '../../apis/Style';
import ActivityIndicator from '../../primitives/ActivityIndicator';
import { Form } from '../../primitives/Form';
import Text from '../../primitives/Text';
import TouchableView from '../../primitives/TouchableView';
import View from '../../primitives/View';
import type {
  ModalFormCancelButtonProps,
  ModalFormSubmitButtonProps,
} from './types.js.flow';

export const ModalFormTitleContainer = styled(View)`
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 70px;
  right: 70px;
`;

export const modalFormMobileTitleTextStyle = css`
  font-size: 18px;
  color: #2b2826;
  line-height: 18px;
`;

export const modalFormMobileHeaderStyle = css`
  flex: none;
  flex-direction: row;
  justify-content: space-between;
  background-color: white;
  border-width: 0;
  border-top-width: 1px;
  border-bottom-width: 1px;
  border-style: solid;
  border-color: #dddbda;
  height: 45px;
`;

const buttonStyle = css`
  align-items: center;
  justify-content: center;
  padding: 0 16px;
`;

const CancelButton = styled(TouchableView)`
  ${buttonStyle};
`;

export const ModalFormHeaderCancelButton = ({
  onPress,
  text = 'Cancel',
}: ModalFormCancelButtonProps) => (
  <CancelButton onPress={onPress}>
    <Text>{text}</Text>
  </CancelButton>
);

const StyledSubmitButton = styled(Form.SubmitButton)`
  ${buttonStyle};
`;

const SubmitButtonText = styled(Text)`
  color: #ff7800;
`;

export const ModalFormHeaderSubmitButton = ({
  text = 'Submit',
}: ModalFormSubmitButtonProps) => (
  <StyledSubmitButton>
    {({ submitting }) =>
      submitting ? (
        <ActivityIndicator />
      ) : (
        <SubmitButtonText>{text}</SubmitButtonText>
      )
    }
  </StyledSubmitButton>
);

export const modalFormContentStyle = css`
  flex: 1;
  background-color: #f7f7f7;
  padding: 16px;
`;
