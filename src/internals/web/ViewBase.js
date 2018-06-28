// @flow

import * as React from 'react';
import uniqueId from 'lodash/uniqueId';
import ReactDOM from 'react-dom';
import UIManager from 'react-native-web/dist/exports/UIManager';
import ResponderEventPlugin from 'react-native-web/dist/modules/ResponderEventPlugin';
import styled from 'styled-components';
import type { ViewLayoutEvent } from '../../events.js.flow';
import { flex } from './styles';

const {
  EventPluginHub,
  // $FlowFixMe
} = ReactDOM.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED;

EventPluginHub.injection.injectEventPluginsByName({
  ResponderEventPlugin,
});

type Props = {
  accessibilityLabel?: string,
  children?: React.Node,
  className?: string,
  disabled?: boolean,
  onKeyDown?: (event: SyntheticEvent<>) => void,
  onKeyPress?: (event: SyntheticEvent<>) => void,
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

class ViewBase extends React.Component<Props> {
  props: Props;

  componentDidMount() {
    this._isMounted = true;

    // Defer adding resize event handler to window to support server-side
    // rendering
    this._resizeDetector = require('./detectResize');
    this._resizeDetector.register(this._onLayoutId, this);
    this._onLayout();
  }

  componentDidUpdate() {
    this._onLayout();
  }

  componentWillUnmount() {
    this._isMounted = false;
    this._resizeDetector.unregister(this._onLayoutId);
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

    return <Div {...props}>{children}</Div>;
  }

  _isMounted: ?boolean;
  _lastLayout = {};
  _onLayoutId: string = uniqueId('onLayout');
  _resizeDetector: {
    register: (id: string, instance: ViewBase) => void,
    unregister: (id: string) => void,
  };

  _onLayout = () => {
    const { onLayout } = this.props;

    if (onLayout) {
      UIManager.measure(ReactDOM.findDOMNode(this), (x, y, width, height) => {
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
  ${flex};
`;
