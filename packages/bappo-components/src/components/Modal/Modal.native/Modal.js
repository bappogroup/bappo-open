// @flow

import * as React from 'react';
import styled from 'styled-components';
import Overlay from '../../../primitives/Overlay';
import type { ModalProps } from '../types.js.flow';

type Props = ModalProps;

class Modal extends React.Component<Props> {
  render() {
    const { children, onRequestClose, visible } = this.props;

    return (
      <Overlay onPress={onRequestClose} visible={visible}>
        <ModalOuterContainer>
          <ModalSafeArea>
            <ModalContentContainer>{children}</ModalContentContainer>
          </ModalSafeArea>
        </ModalOuterContainer>
      </Overlay>
    );
  }
}

export default Modal;

const ModalOuterContainer = styled.SafeAreaView`
  flex: 1;
`;

const ModalSafeArea = styled.View`
  flex: 1;
`;

const ModalContentContainer = styled.View`
  background-color: white;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
`;
