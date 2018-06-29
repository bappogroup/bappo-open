// @flow

import * as React from 'react';
import ExecutionEnvironment from 'exenv';
import ReactDOM from 'react-dom';
import styled from 'styled-components';
import ViewBase from '../../../internals/web/ViewBase';
import type { OverlayProps } from '../types.js.flow';
import OverlayDefaultProps from '../defaultProps';

type Props = OverlayProps;

class Overlay extends React.Component<Props> {
  props: Props;

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

    const { children, color, onLayout, visible } = this.props;

    const portalChild = visible ? (
      <OverlayContainer
        onClick={this._onClick}
        onLayout={onLayout}
        color={color}
      >
        {children}
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

const OverlayContainer = styled(ViewBase).attrs({
  'aria-modal': 'true',
})`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: ${props => props.color};
`;
