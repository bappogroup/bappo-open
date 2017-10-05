// @flow

import styled from 'styled-components/native';

export const Container = styled.View`
  position: relative;
`;

export const Control = styled.View`
  position: relative;
  flex-direction: row;
  align-items: center;
`;

export const IconText = styled.Text`
  font-size: 24px;
  padding-bottom: 10px;
  padding-horizontal: 10px;
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
`;

export const Placeholder = styled.Text`
  color: #aaa;
  padding-left: 10px;
`;

export const PopupContentContainer = styled.View`
  flex: 1;
`;

export const PopupText = styled.Text`
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
