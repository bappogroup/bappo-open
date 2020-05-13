// @flow

import * as React from 'react';
import styled from 'styled-components';

import IconButton from '../../../components/IconButton';
import type { ViewLayoutEvent } from '../../../events.js.flow';
import { breakpoint } from '../../../internals/web/breakpoint';
import FlexDiv from '../../../internals/web/FlexDiv';
// $FlowFixMe typescript
import { DivViewBase } from '../../../internals/web/ViewBase';
import Overlay from '../../../primitives/Overlay';
import Text from '../../../primitives/Text';
import View from '../../../primitives/View';
import type { ModalProps } from '../types.js.flow';

type Props = ModalProps;
type State = {
  modalContentLayout: null | {
    height: number,
    width: number,
  },
};

class Modal extends React.Component<Props, State> {
  static defaultProps = {
    hideHeader: false,
  };
  state = {
    modalContentLayout: null,
  };

  componentDidUpdate(prevProps: Props) {
    if (this.props.visible && !prevProps.visible) {
      this._focusContent();
    }
  }

  render() {
    const {
      children,
      onRequestClose,
      visible,
      placement,
      title,
      renderFooter,
      hideHeader,
    } = this.props;
    return (
      <Overlay onPress={onRequestClose} visible={visible}>
        <ModalContentContainer
          innerRef={this._modalContentContainerRef}
          layout={this.state.modalContentLayout}
          onKeyDown={this._onModalContentKeyDown}
          onLayout={this._onModalContentLayout}
          placement={placement}
        >
          {/* There are three condition here
          1. Bydefault the header will not show as older application using previous version modal,
          there has been header there.
          2. When user give a title the new modal will show title in a header
          3. When user don't want a title but a header he will use showHeader
          */}
          {title || !hideHeader ? (
            <ModalHeadr>
              <ModalTitleContainer>
                <ModalTitleText>{title}</ModalTitleText>
              </ModalTitleContainer>
              <ModalCloseIcon name="clear" onPress={onRequestClose} />
            </ModalHeadr>
          ) : null}

          {children}
          {typeof renderFooter === 'function' ? (
            <ModalFooter>{renderFooter()}</ModalFooter>
          ) : null}
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

export const ModalContentContainer = styled(DivViewBase).attrs({
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

const ModalHeadr = styled(View)`
  flex: none;
  flex-direction: row;
  justify-content: space-between;
  background-color: white;
  border-bottom: 1px solid #dddbda;
  height: 55px;
`;

export const ModalTitleContainer = styled(View)`
  align-items: center;
  justify-content: center;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 70px;
  right: 70px;
`;

const ModalTitleText = styled(Text).attrs({
  numberOfLines: 2,
})`
  font-size: 20px;
  color: #2b2826;
  line-height: 20px;

  @media (max-width: ${breakpoint.max}px) {
    font-size: 16px;
    color: #2b2826;
    line-height: 16px;
    text-align: center;
  }
`;

const ModalCloseIcon = styled(IconButton)`
  position: absolute;
  right: 20px;
  top: 15px;
`;

const ModalFooter = styled(FlexDiv)`
  flex: none;
  flex-direction: row;
  justify-content: space-between;
  background-color: #f1f1f0;
  border-top: 1px solid #dddbda;
  height: 64px;
  padding: 16px;
`;

const desktopStyle = ({ layout, placement }) => {
  if (
    placement &&
    placement.type === 'dropdown' &&
    placement.align === 'left'
  ) {
    return `
      border-radius: 2px;
      left: ${placement.left}px;
      top: ${placement.top}px;
      height: ${placement.height}px;
      width: ${placement.width}px;        
    `;
  }

  if (
    placement &&
    placement.type === 'dropdown' &&
    placement.align === 'right'
  ) {
    return `
      border-radius: 2px;
      right: ${placement.right}px;
      top: ${placement.top}px;
      height: ${placement.height}px;
      width: ${placement.width}px;        
    `;
  }

  if (placement && placement.type === 'fullscreen') {
    return `
      left: 0;
      right: 0;
      top: 0;
      bottom: 0;
      border-radius: 0px;
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
          top: calc(50vh - ${Math.ceil(layout.height / 2)}px);
        `
        : `
          opacity: 0;
        `
    };
    `;
};
