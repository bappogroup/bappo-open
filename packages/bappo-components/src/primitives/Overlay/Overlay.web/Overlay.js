// @flow

import ExecutionEnvironment from 'exenv';
import * as React from 'react';
import ReactDOM from 'react-dom';

import OverlayDefaultProps from '../defaultProps';
import type { OverlayProps } from '../types.js.flow';
import CloseButton from './CloseButton';
import OverlayContainer from './OverlayContainer';

type Props = OverlayProps;

class Overlay extends React.Component<Props> {
  static defaultProps = OverlayDefaultProps;

  constructor(props: Props) {
    super(props);

    if (ExecutionEnvironment.canUseDOM) {
      this._el = document.createElement('div');
    }
  }

  componentDidMount() {
    if (!this._parent || !this._el) return;

    this._parent.appendChild(this._el);
  }

  componentWillUnmount() {
    if (!this._parent || !this._el) return;

    this._parent.removeChild(this._el);
  }

  render() {
    if (!this._el) {
      return null;
    }

    const {
      children,
      onLayout,
      visible,
      showCloseButton = false,
      closeButtonStyle,
      onClose,
    } = this.props;

    const portalChild = visible ? (
      <OverlayContainer
        onClick={this._onClick}
        onLayout={onLayout}
        testID="overlay-container"
      >
        {children}
        {showCloseButton && (
          <CloseButton onPress={onClose} closeButtonStyle={closeButtonStyle} />
        )}
      </OverlayContainer>
    ) : null;

    return ReactDOM.createPortal(portalChild, this._el);
  }

  _el: ?HTMLDivElement;
  _parent = document.body;

  _onClick = (event: SyntheticMouseEvent<>) => {
    if (event.target === event.currentTarget) {
      const { onPress } = this.props;
      onPress && onPress();
    }
  };
}

export default Overlay;
