import React from 'react';
import uniqueId from 'lodash/uniqueId';
import ReactDOM from 'react-dom';
// @ts-ignore
import { injectEventPluginsByName } from 'react-dom/unstable-native-dependencies';
// @ts-ignore
import UIManager from 'react-native-web/dist/cjs/exports/UIManager';
// @ts-ignore
import ResponderEventPlugin from 'react-native-web/dist/cjs/modules/ResponderEventPlugin';
import styled from 'styled-components';
import { ViewLayoutEvent } from '../../events';
// @ts-ignore
import { flex } from './styles';

injectEventPluginsByName({
  ResponderEventPlugin,
});

interface Props {
  accessibilityLabel?: string;
  children?: React.ReactNode;
  className?: string;
  component?: string;
  onLayout?: (event: ViewLayoutEvent) => void;
  style?: any;
  testID?: string;
}

interface InternalProps extends Props {
  component: string;
  nativeRef?: React.Ref<any>;
  onResponderGrant?: (event: React.SyntheticEvent<any>) => void;
  onResponderMove?: (event: React.SyntheticEvent<any>) => void;
  onResponderRelease?: (event: React.SyntheticEvent<any>) => void;
  onResponderTerminate?: (event: React.SyntheticEvent<any>) => void;
  onResponderTerminationRequest?: (event: React.SyntheticEvent<any>) => boolean;
  onStartShouldSetResponder?: (event: React.SyntheticEvent<any>) => boolean;
}

interface ResizeDetector {
  register: (id: string, instance: ViewBase) => void;
  unregister: (id: string) => void;
}

class ViewBase extends React.Component<InternalProps> {
  componentDidMount() {
    this._isMounted = true;

    // Defer adding resize event handler to window to support server-side
    // rendering
    this._resizeDetector = require('./detectResize') as ResizeDetector;
    this._resizeDetector.register(this._onLayoutId, this);
    this._onLayout();
  }

  componentDidUpdate() {
    this._onLayout();
  }

  componentWillUnmount() {
    this._isMounted = false;
    (this._resizeDetector as ResizeDetector).unregister(this._onLayoutId);
  }

  render() {
    const {
      accessibilityLabel,
      children,
      component,
      nativeRef,
      onLayout,
      testID,
      ...rest
    } = this.props;

    const props = {
      ...rest,
      'aria-label': accessibilityLabel,
      'data-testid': testID,
      ref: nativeRef,
    };

    return React.createElement(component, props, children);
  }

  _isMounted: boolean | undefined;
  _lastLayout: {
    x?: number;
    y?: number;
    height?: number;
    width?: number;
  } = {};
  _onLayoutId: string = uniqueId('onLayout');
  _resizeDetector: ResizeDetector | undefined;

  _onLayout = () => {
    const { onLayout } = this.props;

    if (onLayout) {
      UIManager.measure(
        ReactDOM.findDOMNode(this),
        (x: number, y: number, width: number, height: number) => {
          if (!this._isMounted) return;

          if (
            this._lastLayout.x !== x ||
            this._lastLayout.y !== y ||
            this._lastLayout.width !== width ||
            this._lastLayout.height !== height
          ) {
            this._lastLayout = { x, y, width, height };
            const nativeEvent = { layout: { x, y, width, height } };
            onLayout({
              nativeEvent,
              timeStamp: Date.now(),
            });
          }
        },
      );
    }
  };
}

// Manually pass on responder event handlers since styled-components filters them out
const StyledViewBase = styled(ViewBase).attrs({
  onResponderGrant: (props: any) => props.onResponderGrant,
  onResponderMove: (props: any) => props.onResponderMove,
  onResponderRelease: (props: any) => props.onResponderRelease,
  onResponderTerminate: (props: any) => props.onResponderTerminate,
  onResponderTerminationRequest: (props: any) =>
    props.onResponderTerminationRequest,
  onStartShouldSetResponder: (props: any) => props.onStartShouldSetResponder,
})`
  ${flex};
`;

export default React.forwardRef((props: Props, ref) => {
  return (
    <StyledViewBase
      {...props}
      component={props.component || 'div'}
      nativeRef={ref}
    />
  );
});
