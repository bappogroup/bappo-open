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
  $width: any;
  $maxHeight: any;
}>`
  width: ${({ $width }) => `${$width}px`};
  max-height: ${({ $maxHeight }) => `${$maxHeight}px`};
`;
