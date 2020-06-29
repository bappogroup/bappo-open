import React from 'react';
import styled from 'styled-components';

import Icon from '../../../components/Icon';
import TouchableView from '../../TouchableView';

const CloseButton = ({ onPress, closeButtonStyle }) => (
  <Container onPress={onPress}>
    <CloseIcon name="close" style={closeButtonStyle} />
  </Container>
);

export default CloseButton;

const Container = styled(TouchableView).attrs(props => ({
  activeOpacity: 1,
}))`
  position: absolute;
  top: 0;
  left: 0;
  padding: 15px;
`;

const CloseIcon = styled(Icon)`
  color: white;
  font-size: 27px;
`;
