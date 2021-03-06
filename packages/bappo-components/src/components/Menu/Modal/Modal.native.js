import React from 'react';
import RN from 'react-native';
import styled from 'styled-components';

const Modal = ({ children, ...props }) => {
  return (
    <RN.Modal animationType="slide" {...props}>
      <ModalOuterContainer>
        <ModalSafeArea>{children}</ModalSafeArea>
      </ModalOuterContainer>
    </RN.Modal>
  );
};

export default Modal;

const ModalOuterContainer = styled.SafeAreaView`
  flex: 1;
`;

const ModalSafeArea = styled.View`
  flex: 1;
`;
