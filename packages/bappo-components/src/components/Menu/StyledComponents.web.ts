import styled from 'styled-components';

import { DeviceKind } from '../../apis/DeviceKind';
import { DivTouchableViewBase } from '../../internals/web/TouchableViewBase';
import ScrollView from '../../primitives/ScrollView';
import Text from '../../primitives/Text';
import TouchableView from '../../primitives/TouchableView';
import Icon from '../Icon';

export const ActionRow = styled(TouchableView)`
  flex-direction: row;
  border-bottom: 1px solid #ddd;
  height: 40px;
  align-items: center;
  &:hover {
    background-color: #fafafa;
  }
`;

export const TriggerContainer = styled(DivTouchableViewBase)``;

export const PopoverContentContainer = styled(ScrollView)<{
  $maxWidth?: number;
  $minWidth?: number;
  $maxHeight?: number;
  $deviceKind: DeviceKind;
}>`
  ${({ $deviceKind, $maxWidth, $minWidth, $maxHeight }) => {
    if ($deviceKind === 'desktop' || $deviceKind === 'tablet') {
      return `${$maxWidth ? `max-width: ${$maxWidth}px; ` : ''}
        ${$minWidth ? `min-width: ${$minWidth}px; ` : ''}
        ${$maxHeight ? `max-height: ${$maxHeight}px; ` : ''}`;
    } else {
      return `max-height: 50vh;`;
    }
  }}
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
