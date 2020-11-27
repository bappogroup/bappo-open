import { DeviceKind } from '../../apis/DeviceKind';
import { styled } from '../../apis/Style';
import { breakpoint } from '../../internals/web/breakpoint';
import Text from '../../primitives/Text';
import TouchableView from '../../primitives/TouchableView';
import View from '../../primitives/View';

export const ActionRow = styled(TouchableView)`
  flex-direction: row;
  border-bottom: 1px solid #ddd;
  height: 40px;
  align-items: center;
  padding-left: 8px;
  &:hover {
    background-color: #fafafa;
  }
`;

export const Label = styled(Text)`
  padding-left: 4px;
`;

export const WebContainer = styled.div`
  display: inline-block;
  &:hover {
    opacity: 0.8;
  }
`;

export const BackLink = styled(TouchableView)`
  background-color: #eee;
  flex-direction: row;
  height: 40px;
  align-items: center;
  padding-left: 8px;
  display: none;

  @media (max-width: ${breakpoint.max}px) {
    display: flex;
  }
`;

export const PopoverContentContainer = styled(View)<{
  $maxWidth?: any;
  $minWidth?: any;
  $maxHeight?: any;
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

  overflow-y: scroll;
  overflow-x: scroll;
`;

export const MenuItemLabel = styled(Label)`
  flex-grow: 1;
  flex-shrink: 1;
  max-width: initial;
`;
