// @flow

import * as React from 'react';
import styled from 'styled-components';
import FlexDiv from '../../../internals/web/FlexDiv';
import Overlay from '../../../primitives/Overlay';
import type { ModalProps } from '../types.js.flow';

type Props = ModalProps;

class Modal extends React.Component<Props> {
  props: Props;

  componentDidUpdate(prevProps: Props) {
    if (this.props.visible && !prevProps.visible) {
      this._focusContent();
    }
  }

  render() {
    const {
      children,
      onOverlayPress,
      onRequestClose,
      overlayColor,
      visible,
    } = this.props;

    return (
      <Overlay
        color={overlayColor}
        onPress={onOverlayPress}
        onRequestClose={onRequestClose}
        visible={visible}
      >
        <ModalContentContainer innerRef={this._modalContentContainerRef}>
          {children}
        </ModalContentContainer>
      </Overlay>
    );
  }

  _modalContentContainerRef = React.createRef();

  _focusContent() {
    this._modalContentContainerRef.current &&
      this._modalContentContainerRef.current.focus();
  }
}

export default Modal;

const ModalContentContainer = styled(FlexDiv).attrs({
  tabIndex: -1,
})`
  background-color: white;
  position: absolute;
  left: 0;
  right: 0;

  &:focus {
    outline: none;
  }

  @media (max-width: 576px) {
    top: 0;
    bottom: 0;
  }

  @media (min-width: 577px) {
    margin: auto;
    max-height: 768px;
    min-height: 384px;
    transform: translate(0, -50%);
    width: 576px;
    top: 50%;
  }
`;
