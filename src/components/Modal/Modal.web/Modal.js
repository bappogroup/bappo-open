// @flow

import * as React from 'react';
import styled from 'styled-components';
import type { ViewLayoutEvent } from '../../../events.js.flow';
import { breakpoint } from '../../../internals/web/breakpoint';
import ViewBase from '../../../internals/web/ViewBase';
import Overlay from '../../../primitives/Overlay';
import type { ModalProps } from '../types.js.flow';

type Props = ModalProps;
type State = {
  modalContentLayout: null | {
    height: number,
    width: number,
  },
};

class Modal extends React.Component<Props, State> {
  state = {
    modalContentLayout: null,
  };

  componentDidUpdate(prevProps: Props) {
    if (this.props.visible && !prevProps.visible) {
      this._focusContent();
    }
  }

  render() {
    const { children, onRequestClose, visible, placement } = this.props;
    return (
      <Overlay onPress={onRequestClose} visible={visible}>
        <ModalContentContainer
          innerRef={this._modalContentContainerRef}
          layout={this.state.modalContentLayout}
          onKeyDown={this._onModalContentKeyDown}
          onLayout={this._onModalContentLayout}
          placement={placement}
        >
          {children}
        </ModalContentContainer>
      </Overlay>
    );
  }

  _modalContentContainerRef = React.createRef();

  _focusContent() {
    const domEl = this._modalContentContainerRef.current;
    if (
      domEl &&
      document.activeElement !== domEl &&
      !domEl.contains(document.activeElement)
    ) {
      // only focus if modal container or its children does not have focus
      domEl.focus();
    }
  }

  _onModalContentKeyDown = (event: SyntheticKeyboardEvent<>) => {
    if (event.keyCode === 27) {
      // escape
      event.stopPropagation();
      this.props.onRequestClose();
    }
  };

  _onModalContentLayout = (event: ViewLayoutEvent) => {
    this.setState({ modalContentLayout: event.nativeEvent.layout });
  };
}

export default Modal;

export const ModalContentContainer = styled(ViewBase).attrs({
  // tabIndex: -1,
})`
  background-color: white;
  position: absolute;
  border-radius: 4px;
  overflow: hidden;

  &:focus {
    outline: none;
  }

  @media (max-width: ${breakpoint.max}px) {
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    border-radius: 0px;
  }

  @media (min-width: ${breakpoint.min}px) {
    ${props => desktopStyle(props)};
  }

  @media (min-width: ${breakpoint.min}px) and (max-height: 768px) {
    max-height: 100%;
  }s
`;

const desktopStyle = ({ layout, placement }) => {
  if (placement && placement.type === 'dropdown' && placement.left) {
    return `
      border-radius: 2px;
      left: ${placement.left}px;
      top: ${placement.top}px;
      height: ${placement.height}px;
      width: ${placement.width}px;        
    `;
  }

  if (placement && placement.type === 'dropdown' && placement.right) {
    return `
      border-radius: 2px;
      right: ${placement.right}px;
      top: ${placement.top}px;
      height: ${placement.height}px;
      width: ${placement.width}px;        
    `;
  }

  return `
    left: 0;
    right: 0;
    margin: auto;
    max-height: 768px;
    min-height: 200px;
    width: 576px;
    ${
      layout
        ? `
          top: calc(50vh - ${layout.height / 2}px);
        `
        : `
          opacity: 0;
        `
    };
    `;
};
