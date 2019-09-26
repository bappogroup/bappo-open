// @flow

import { styled } from '../../../apis/Style';
import Text from '../../../primitives/Text';

export const Container = styled.TouchableOpacity`
  position: relative;
`;

export const Control = styled.View`
  position: relative;
  flex-direction: row;
  align-items: center;
`;

export const ListContainer = styled.View`
  flex: 1;
`;

export const ListEmptyContainer = styled.View`
  align-items: center;
  justify-content: center;
`;

export const MultiValueWrapper = styled.View`
  flex: 1;
  flex-direction: row;
  flex-wrap: wrap;
`;

export const Placeholder = styled(Text)`
  color: #aaa;
`;

export const PopupContentContainer = styled.View`
  flex: 1;
`;

export const PopupText = styled(Text)`
  color: #666;
  padding-horizontal: 15px;
  padding-vertical: 10px;
`;

export const OKText = styled(PopupText)`
  color: #46cf98;
`;

export const PopupTopBar = styled.View`
  flex-direction: row;
  border-bottom-color: #ccc;
  border-bottom-width: 1px;
`;

export const PopupTouchableContainer = styled.TouchableOpacity`
  flex: 1;
`;
