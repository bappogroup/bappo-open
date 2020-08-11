// @flow

import styled from 'styled-components';

import Text from '../../primitives/Text';
import TouchableView from '../../primitives/TouchableView';
import View from '../../primitives/View';

export const ActionRow = styled(TouchableView)`
  flex-direction: row;
  border-width: 0px;
  border-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
  height: 40px;
  align-items: center;
  padding-left: 8px;
`;

export const Label = styled(Text)`
  padding-left: 4px;
`;

export const LinkContainer = styled(View)`
  width: 50px;
`;

export const LinkInner = styled(TouchableView)`
  width: 50px;
`;

export const ModalContainer = styled(View)``;

export const BackLink = styled(TouchableView)`
  background-color: #f8f8f8;
  flex-direction: row;
  height: 45px;
  align-items: center;
  padding-left: 8px;
`;
