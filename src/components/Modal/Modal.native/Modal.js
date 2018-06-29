// @flow

import * as React from 'react';
import { Dimensions } from 'react-native';
import styled from 'styled-components';
import Overlay from '../../../primitives/Overlay';
import type { ModalProps } from '../types.js.flow';

type Props = ModalProps;
type State = {
  modalContentLayout: {
    height: number,
    width: number,
  },
};

const { width: initialWindowWidth } = Dimensions.get('window');

class Modal extends React.Component<Props, State> {
  props: Props;

  state = {
    modalContentLayout: {
      height: 0,
      width: 0,
    },
  };

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
        <ModalContentContainer
          layout={this.state.modalContentLayout}
          onLayout={this._onModalContentLayout}
          windowDimensions={Dimensions.get('window')}
        >
          {children}
        </ModalContentContainer>
      </Overlay>
    );
  }

  _onModalContentLayout = (event: SyntheticEvent<>) => {
    // $FlowFixMe
    this.setState({ modalContentLayout: event.nativeEvent.layout });
  };
}

export default Modal;

const ModalContentContainer = styled.View`
  background-color: white;
  position: absolute;
  left: 0;
  right: 0;

  ${({ layout, windowDimensions }) =>
    initialWindowWidth < 576 || windowDimensions.width < 576
      ? // small screen
        `
    top: 0;
    bottom: 0;
  `
      : // large screen
        `
    top: ${(windowDimensions.height - layout.height) / 2}px;
    margin-left: auto;
    margin-right: auto;
    max-height: 768px;
    min-height: 384px;
    width: 576px;
  `};
`;
