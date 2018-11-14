import React from 'react';
import styled from 'styled-components';
import TouchableView from '../../TouchableView';
import Icon from '../../../components/Icon';

const CloseButton = ({ onPress }) => (
  <Container onPress={onPress}>
    <CloseIcon name="close" />
  </Container>
);

export default CloseButton;

const Container = styled(TouchableView).attrs({
  activeOpacity: 1,
})`
  position: absolute;
  top: 0;
  left: 0;
  padding: 15px;
`;

const CloseIcon = styled(Icon)`
  color: white;
  font-size: 27px;
`;
