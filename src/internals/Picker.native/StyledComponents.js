// @flow

import { styled } from '../../apis/Style';
import Text from '../../primitives/Text';

export const Container = styled.View`
  position: relative;
`;

export const Control = styled.TouchableOpacity`
  position: relative;
  flex-direction: row;
  align-items: center;
`;

export const IconText = styled.Text`
  font-size: 24px;
  transform: translateY(-14px);
`;

export const IconTextContainer = styled.View`
  height: 17px;
  overflow: hidden;
  margin-left: 10px;
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

export const ValueContainer = styled.View`
  flex: 1;
  flex-direction: row;
`;
