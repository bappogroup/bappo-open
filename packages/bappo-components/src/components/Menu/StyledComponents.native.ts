import { Dimensions } from 'react-native';
import styled from 'styled-components';

import ScrollView from '../../primitives/ScrollView';
import Text from '../../primitives/Text';
import TouchableView from '../../primitives/TouchableView';
import Icon from '../Icon';

export const ActionRow = styled(TouchableView)`
  flex-direction: row;
  border-width: 0px;
  border-style: solid;
  border-bottom-width: 1px;
  border-bottom-color: #eee;
  height: 40px;
  align-items: center;
`;

export const TriggerContainer = styled(TouchableView)``;

export const ModalContainer = styled(ScrollView)`
  max-height: ${Dimensions.get('window').height}px;
`;

export const MenuItemIcon = styled(Icon)`
  margin-left: 8px;
`;

export const MenuItemLabel = styled(Text)<{
  $hasIcon: boolean;
}>`
  padding-right: 8px;
  ${({ $hasIcon }) => ($hasIcon ? '' : `padding-left: 8px;`)};
`;
