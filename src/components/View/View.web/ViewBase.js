// @flow

import * as React from 'react';
import { debounce, uniqueId } from 'lodash';
import { findDOMNode } from 'react-dom';
import styled from 'styled-components';
import 'react-native-web/dist/modules/injectResponderEventPlugin';
import UIManager from '../../../apis/UIManager';
import type {
  ViewLayoutEvent,
} from '../../../events.js.flow';

type Props = {
  accessibilityLabel?: string,
  children?: React.Node,
  className?: string,
  disabled?: boolean,
  onKeyDown?: (event: SyntheticEvent<>) => void,
  onKeyUp?: (event: SyntheticEvent<>) => void,
  onLayout?: (event: ViewLayoutEvent) => void,
  onResponderGrant?: (event: SyntheticEvent<>) => void,
  onResponderMove?: (event: SyntheticEvent<>) => void,
  onResponderRelease?: (event: SyntheticEvent<>) => void,
  onResponderTerminate?: (event: SyntheticEvent<>) => void,
  onResponderTerminationRequest?: (event: SyntheticEvent<>) => boolean,
  onScroll?: (event: SyntheticEvent<>) => void,
  onStartShouldSetResponder?: (event: SyntheticEvent<>) => boolean,
  role?: string,
  style?: any,
  tabIndex?: number,
  testID?: string,
};

const registry = new Map();

const triggerAll = () => {
  registry.forEach((instance) => {
    instance._onLayout();
  });
};
window.addEventListener('resize', debounce(triggerAll, 16), false);

class ViewBase extends React.Component<Props> {
  props: Props;

  componentDidMount() {
    this._isMounted = true;
    this._onLayoutId = uniqueId('onLayout');
    registry.set(this._onLayoutId, this);
    this._onLayout();
  }

  componentDidUpdate() {
    this._onLayout();
  }

  componentWillUnmount() {
    this._isMounted = false;
    registry.delete(this._onLayoutId);
  }

  render() {
    const {
      accessibilityLabel,
      children,
      onScroll,
      testID,
      ...rest
    } = this.props;

    const props = {
      ...rest,
      onScroll,
      'aria-label': accessibilityLabel,
      'data-testid': testID,
    };

    return (
      <Div
        {...props}
      >
        {children}
      </Div>
    );
  }

  _isMounted: ?boolean;
  _lastLayout = {};
  _onLayoutId: ?string;

  _onLayout = () => {
    const {
      onLayout,
    } = this.props;

    if (onLayout) {
      UIManager.measure(findDOMNode(this), (x, y, width, height) => {
        if (!this._isMounted) return;

        if (
          this._lastLayout.x !== x ||
          this._lastLayout.y !== y ||
          this._lastLayout.width !== width ||
          this._lastLayout.height !== height
        ) {
          this._lastLayout = { x, y, width, height };
          const nativeEvent = { layout: this._lastLayout };
          onLayout({
            nativeEvent,
            timeStamp: Date.now(),
          });
        }
      });
    }
  };
}

export default ViewBase;

// Manually pass on responder event handlers since styled-components filters them out
const Div = styled.div.attrs({
  onResponderGrant: props => props.onResponderGrant,
  onResponderMove: props => props.onResponderMove,
  onResponderRelease: props => props.onResponderRelease,
  onResponderTerminate: props => props.onResponderTerminate,
  onResponderTerminationRequest: props => props.onResponderTerminationRequest,
  onStartShouldSetResponder: props => props.onStartShouldSetResponder,
})`
  align-items: stretch;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-grow: 0;
  flex-shrink: 0;
  position: relative;
  min-height: 0;
  min-width: 0;
`;
