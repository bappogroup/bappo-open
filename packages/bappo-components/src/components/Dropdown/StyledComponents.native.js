// @flow

import styled from 'styled-components';
import TouchableView from '../../primitives/TouchableView';
import Text from '../../primitives/Text';
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
  padding-top: 20px;
  background-color: #ddf;
  flex-direction: row;
  height: 60px;
  align-items: center;
  padding-left: 8px;
`;
